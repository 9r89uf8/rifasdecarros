// app/api/posts/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';

export async function GET() {
    try {
        const snapshot = await adminDb.firestore().collection('posts').orderBy('timestamp', 'desc').get();
        const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));


        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
