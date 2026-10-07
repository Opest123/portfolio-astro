// Ported from resources/views/email/contact.blade.php + contact_text.blade.php
import { escapeHtml } from '../../html';
import { button, divider, field, label, muted, row, textBlock } from '../components';
import { emailLayout } from '../layout';

export interface ContactMessage {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const formatReceived = (d: Date) =>
    new Intl.DateTimeFormat('en-AU', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Australia/Brisbane' }).format(d);

/** Builds the notification email Stephen receives when someone uses the contact form. */
export function contactEmail(msg: ContactMessage, received = new Date()) {
    const when = formatReceived(received);
    const name = escapeHtml(msg.name);
    const email = escapeHtml(msg.email);
    const subject = escapeHtml(msg.subject);
    const replyHref = escapeHtml(`mailto:${msg.email}?subject=${encodeURIComponent(`RE: ${msg.subject}`)}`);

    const html = emailLayout({
        title: 'New portfolio message',
        preheader: `${name} sent you a message about ${subject}`,
        eyebrow: 'New contact message',
        heading: `${name} sent you a message`,
        subheading: `Received ${when} &middot; via stephenenikanoselu.com`,
        body: [
            row(
                label('From') +
                `<p class="text-main" style="margin:0; font-size:15px; color:#111827; font-weight:600;">${name}</p>
                 <p style="margin:2px 0 0; font-size:14px;"><a href="mailto:${email}" style="color:#7c3aed; text-decoration:none;">${email}</a></p>`,
                '18px 32px 0',
            ),
            divider(),
            field('Subject', subject),
            textBlock('Message', escapeHtml(msg.message).replace(/\n/g, '<br>')),
            row(button(replyHref, `Reply to ${name}`) + muted(`Or just hit reply &mdash; it goes straight to ${email}.`), '24px 32px 26px'),
        ].join('\n'),
    });

    const text = `NEW CONTACT MESSAGE
Received ${when} via stephenenikanoselu.com

From:    ${msg.name} <${msg.email}>
Subject: ${msg.subject}

Message:
${msg.message}

--
Reply directly to this email to respond to ${msg.name} (${msg.email}).
Sent from the contact form on https://www.stephenenikanoselu.com`;

    return {
        subject: `New portfolio message: ${msg.subject}`,
        replyTo: `${msg.name} <${msg.email}>`,
        html,
        text,
    };
}
