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

        if (session.payment_status === 'paid') {
            const userId = session.metadata.userId;
            const jornadaId = session.metadata.jornadaId;

            const quinielasRef = adminDb.firestore().collection('quiniela');
            const quinielasSnapshot = await quinielasRef
                .where('paid', '==', false)
                .where('jornadaId', '==', jornadaId) // Filter for active jornadas
                .where('user', '==', userId)
                .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
                .get();

            if (quinielasSnapshot.empty) {
                res.status(404).json({ message: 'No active jornadas found.' });
                return;
            }

            // Prepare a batch write
            let batch = adminDb.firestore().batch();

            quinielasSnapshot.docs.forEach(doc => {
                let docRef = quinielasRef.doc(doc.id); // Get a reference to the document
                batch.update(docRef, { paid: true }); // Update the 'paid' field to true
            });

            // Commit the batch
            await batch.commit();

            // After successful update of quinielas, update the user's quinielas amount
            const userRef = adminDb.firestore().collection('users').doc(userId);
            // Update user's quinielas amount to the length of the updated quinielas
            await userRef.update({ userQuinielasAmount: quinielasSnapshot.size, jornadaId: jornadaId });

            // After successful update, create the updated quinielas array
            const updatedQuinielas = quinielasSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                paid: true // Set paid to true as it's now updated
            }));


            const userDoc = await adminDb
                .firestore()
                .collection('users')
                .doc(userId)
                .get();


            const userData = userDoc.data();

            const jornadaDocRef = adminDb.firestore().collection('jornada').doc(jornadaId);
            const jornadaSnapshot = await jornadaDocRef.get();
            const jornada = jornadaSnapshot.data();
            const quinielas = quinielasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            let price = 0
            let total = 0
            let totalString = ''
            if(userData.country==='US'){
                price = jornada.price
                total = quinielas.length*jornada.price
                totalString = `${total} Dólares`
            }else {
                price = jornada.price*15
                total = quinielas.length*(jornada.price*15)
                totalString = `${total} Pesos`
            }


            const mailgun = require("mailgun-js");
            const DOMAIN = "quinielasligamx.com";
            const mg = mailgun({apiKey: process.env.MAILGUN_API, domain: DOMAIN});
            const data = {
                from: "Compra <mailgun@quinielasligamx.com>",
                to: userData.email,
                subject: "Compra de quinielas",
                template: "quinielas",
                'h:X-Mailgun-Variables': JSON.stringify({quinielas: quinielas, id: jornada.id, name: userData.name, quantity: quinielas.length, price: price, total: total, totalString: totalString})
            };
            mg.messages().send(data, function (error, body) {
                console.log(body);
            });


            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false });
        }
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
