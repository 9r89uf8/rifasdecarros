import { NextResponse } from 'next/server';
import {adminAuth} from "@/app/utils/firebaseAdmin";
import mailgun from 'mailgun-js';
const DOMAIN = "quinielasligamx.com";
const mg = mailgun({ apiKey: process.env.MAILGUN_API, domain: DOMAIN });

export async function POST(req) {
    const { email } = await req.json();

    try {
        const passwordResetLink = await adminAuth.generatePasswordResetLink(email);


        const data = {
            from: 'Nueva contraseña <mailgun@yourdomain.com>',
            to: email,
            subject: 'Crear nueva contraseña',
            template: 'password',
            'h:X-Mailgun-Variables': JSON.stringify({ passwordResetLink }),
        };

        mg.messages().send(data, function (error, body) {
            if (error) {
                return NextResponse.json({ message: 'Failed to send password reset email.' }, { status: 500 });
            }
        });

        return NextResponse.json({ message: 'Correo electrónico de restablecimiento de contraseña enviado.' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to send password reset email.' }, { status: 500 });
    }
}