// app/api/posts/create/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
import { authMiddleware } from '@/app/middleware/authMiddleware';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

// Set the AWS region
const REGION = "us-east-2"; // e.g. "us-east-1"

// Create an Amazon S3 service client object.
const s3Client = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_KEY,
    }
});

const uploadToS3 = async (file, fileName) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        let extension;
        if (file.type === 'image/png') extension = '.png';
        else if (file.type === 'image/jpeg') extension = '.jpg';
        else if (file.type === 'video/mp4') extension = '.mp4';
        // Add other mimetypes here as necessary...

        const params = {
            Bucket: 'chicagocarhelp',
            Key: `${fileName}${extension}`, // Add the extension to the filename
            Body: buffer,
            ACL: 'public-read',
            ContentType: file.type, // This will set the Content-Type metadata on S3
        };

        s3Client.send(new PutObjectCommand(params))
            .then(() => {
                resolve(`https://chicagocarhelp.s3.amazonaws.com/${fileName}${extension}`);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export async function POST(req) {
    try {
        await authMiddleware(req);
        const formData = await req.formData();
        const title = formData.get('title');
        const content = formData.get('content');
        const images = formData.getAll('images');
        const videos = formData.getAll('videos');

        const postRecord = {
            title,
            content,
            userId: req.user.uid,
            timestamp: adminDb.firestore.FieldValue.serverTimestamp(),
            images: [],
            videos: [],
        };

        if (videos.length > 0) {
            for (const video of videos) {
                const videoUrl = await uploadToS3(video, `post-videos/${uuidv4()}`);
                postRecord.videos.push(videoUrl);
            }
        }

        if (images.length > 0) {
            for (const image of images) {
                const imageUrl = await uploadToS3(image, `post-images/${uuidv4()}`);
                postRecord.images.push(imageUrl);
            }
        }

        // Save the post to Firestore
        const postRef = await adminDb.firestore().collection('posts').add(postRecord);

        // Fetch the created post
        const postDoc = await postRef.get();
        const post = { id: postDoc.id, ...postDoc.data() };

        return new Response(JSON.stringify(post), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log(error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}