// app/api/auth/register/route.js
import { adminAuth, adminDb } from '@/app/utils/firebaseAdmin';
import {cookies} from "next/headers";

export async function POST(req) {
    const { email, password, username, phoneNumber, country } = await req.json();

    try {
        // Create the user in Firebase Authentication
        const userRecord = await adminAuth.createUser({
            email,
            password,
        });

        // Save user data to Firestore
        await adminDb.firestore().collection('users').doc(userRecord.uid).set({
            uid: userRecord.uid,
            email,
            phone: phoneNumber,
            country,
            amountWon: 0,
            freeQuinielasAmount: 0,
            userQuinielasAmount: 0,
            jornadaId: '',
            name: username,
        });

        // Generate a custom token for the user
        const token = await adminAuth.createCustomToken(userRecord.uid);

        // Fetch the saved user document from Firestore
        const userDoc = await adminDb.firestore().collection('users').doc(userRecord.uid).get();
        const userData = userDoc.data();

        // Set the token in an httpOnly cookie
        const cookieStore = cookies();
        cookieStore.set('token', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600, // 1 hour
        });

        return new Response(JSON.stringify({ user: userData }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
