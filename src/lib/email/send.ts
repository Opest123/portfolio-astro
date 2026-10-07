import { EMAIL_FROM, RESEND_API_KEY } from 'astro:env/server';

export interface Email {
    to: string | string[];
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
    from?: string;
}

/** Sends an email via Resend's REST API (no SDK needed). */
export async function sendEmail(email: Email) {
    if (!RESEND_API_KEY) {
        // Lets forms be demoed locally without email credentials.
        console.warn(`[email] RESEND_API_KEY not set, skipping send: "${email.subject}" → ${email.to}`);
        console.log(email.text);
        return;
    }

    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: email.from ?? EMAIL_FROM,
            to: Array.isArray(email.to) ? email.to : [email.to],
            reply_to: email.replyTo,
            subject: email.subject,
            html: email.html,
            text: email.text,
        }),
    });

    if (!res.ok) {
        throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    }
}
