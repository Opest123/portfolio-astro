import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { CONTACT_TO_EMAIL } from 'astro:env/server';
import { sendEmail } from '../lib/email/send';
import { contactEmail } from '../lib/email/templates/contact';

// Astro parses empty form fields as null, so the message has to cover the
// type check as well as the min-length check.
const required = (error: string, max: number) => z.string({ error }).trim().min(1, { error }).max(max);

export const server = {
    // Same rules as the old Laravel ContactController::contact() validation.
    contact: defineAction({
        accept: 'form',
        input: z.object({
            first_name: required('Please enter your first name.', 100),
            last_name: required('Please enter your last name.', 100),
            email: z.email({ error: 'Please enter a valid email address.' }).max(255),
            subject: required('Please add a subject.', 150),
            message: required('Please write a message.', 5000),
        }),
        handler: async (input) => {
            try {
                const email = contactEmail({
                    name: `${input.first_name} ${input.last_name}`,
                    email: input.email,
                    subject: input.subject,
                    message: input.message,
                });
                await sendEmail({ to: CONTACT_TO_EMAIL, ...email });
            } catch (err) {
                console.error('[contact] failed to send email', err);
                throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Could not send message.' });
            }
            return { sent: true };
        },
    }),
};
