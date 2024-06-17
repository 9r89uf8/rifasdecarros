import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/app/utils/firebaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});

export async function POST(req) {
    const { session_id } = await req.json();

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        const sessionRef = adminDb.firestore().collection('sessions').doc(session_id);
        const userId = session.metadata.userId;
        const postId = session.metadata.postId;
        const ticketTotal = session.metadata.ticketTotal;

        await adminDb.firestore().runTransaction(async (transaction) => {
            // Perform all reads first
            const sessionDoc = await transaction.get(sessionRef);
            const userRef = adminDb.firestore().collection('users').doc(userId);
            const userDoc = await transaction.get(userRef);
            const purchasesRef = userRef.collection('purchases').doc(postId);
            const purchaseDoc = await transaction.get(purchasesRef);

            if (sessionDoc.exists && sessionDoc.data().processed) {
                return NextResponse.json({ success: true });
            }

            if (!sessionDoc.exists) {
                transaction.set(sessionRef, {
                    processed: false,
                    payment_status: session.payment_status,
                    created_at: adminDb.firestore.FieldValue.serverTimestamp(),
                });
            }

            if (session.payment_status !== 'paid' || (sessionDoc.exists && sessionDoc.data().processed)) {
                throw new Error('Session not paid or already processed');
            }

            if (!userDoc.exists) {
                throw new Error('User not found');
            }

            const userData = userDoc.data();

            // Perform all writes after reads
            const participantsCollectionRef = adminDb.firestore().collection('posts').doc(postId).collection('participants');
            for (let i = 0; i < ticketTotal; i++) {
                const participantDocRef = participantsCollectionRef.doc();
                transaction.set(participantDocRef, {
                    name: userData.name,
                    uid: userId,
                });
            }

            if (purchaseDoc.exists) {
                transaction.update(purchasesRef, {
                    quantity: adminDb.firestore.FieldValue.increment(parseInt(ticketTotal)),
                });
            } else {
                transaction.set(purchasesRef, {
                    raffleId: postId,
                    quantity: parseInt(ticketTotal),
                    purchaseDate: adminDb.firestore.FieldValue.serverTimestamp(),
                });
            }

            // Mark session as processed
            transaction.update(sessionRef, { processed: true });
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


