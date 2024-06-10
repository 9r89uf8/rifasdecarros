// app/api/posts/create/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
import { authMiddleware } from '@/app/middleware/authMiddleware';

export async function POST(req) {
    try {
        await authMiddleware(req);
        const { jornada, user } = await req.json();

        if (!req.user) {
            return new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const jornadaDocRef = await adminDb.firestore().collection('jornada').doc(jornada.id);
        const jornadaSnapshot = await jornadaDocRef.get();

        if (!jornadaSnapshot.exists) {
            return new Response(JSON.stringify({ error: 'Jornada not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const jornadaData = jornadaSnapshot.data();

        const quinielasSnapshot = await adminDb.firestore().collection('quiniela')
            .where('paid', '==', false)
            .where('user', '==', user.uid)
            .where('jornadaId', '==', jornada.id)
            .orderBy('timestamp', 'desc')
            .get();

        const quinielas = quinielasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // If no quinielas are found, return empty list and quantity 0
        if (quinielas.length === 0) {
            return new Response(JSON.stringify({ quinielas: [], price: jornadaData.price, quantity: 0, total: 0, totalString: '' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const userDoc = await adminDb.firestore().collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        let freeQuinielas = userData.freeQuinielasAmount || 0;

        let price = 0;
        let total = 0;
        let totalString = '';

        // Calculate the total number of quinielas being purchased that need to be paid for
        let payableQuinielasCount = Math.max(0, quinielas.length - freeQuinielas);

        if (userData.country === 'US') {
            price = jornadaData.price;
            total = payableQuinielasCount * jornadaData.price;
            totalString = `${total} Dollars`;
        } else {
            price = jornadaData.price * 15;
            total = payableQuinielasCount * (jornadaData.price * 15);
            totalString = `${total} Pesos`;
        }

        return new Response(JSON.stringify({
            quinielas: quinielas, price: price, free: userData.freeQuinielasAmount, quantity: quinielas.length, total: total, totalString: totalString
        }), {
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

