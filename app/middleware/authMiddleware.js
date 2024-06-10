// app/middleware/authMiddleware.js
import { adminAuth } from '@/app/utils/firebaseAdmin';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const authMiddleware = async (req) => {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('Authentication required');
    }

    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        req.user = decodedToken;
    } catch (error) {
        console.log(error.message)
        throw new Error('Invalid token');
    }
};


