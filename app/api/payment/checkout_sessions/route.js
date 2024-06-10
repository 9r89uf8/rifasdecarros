import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/app/utils/firebaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});

export async function POST(req) {
    const { userId, country, price, jornadaId } = await req.json();
    const origin = 'http://localhost:3000'; // Default to localhost for development

    console.log(price)

    const quinielasRef = adminDb.firestore().collection('quiniela');
    const quinielasSnapshot = await quinielasRef
        .where('paid', '==', false)
        .where('jornadaId', '==', jornadaId) // Filter for active jornadas
        .where('user', '==', userId)
        .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
        .get();


    // Calculate quantity
    const quantity = quinielasSnapshot.size;
    console.log(quantity)
    //set the quantity on the payment by checking how many quinielas the snapshot has

    let currency, fPrice, locale;
    switch (country) {
        case 'US':
            currency = 'usd';
            fPrice = price;
            locale = 'en'; // Locale for the United States
            break;
        case 'MX':
            currency = 'mxn';
            fPrice = price * 15;
            locale = 'es-419'; // Locale for Mexico
            break;
        default:
            currency = 'usd';
            fPrice = price;
            locale = 'en'; // Default locale
    }

    try {
        const params = {
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: 'Quinielas',
                        },
                        unit_amount: fPrice*100,
                    },
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            locale: locale,
            metadata: { userId: userId, jornadaId: jornadaId },
            success_url: `${origin}/payment/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/payment/result?session_id={CHECKOUT_SESSION_ID}`,
        };

        const checkoutSession = await stripe.checkout.sessions.create(params);


        return NextResponse.json(checkoutSession);
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

