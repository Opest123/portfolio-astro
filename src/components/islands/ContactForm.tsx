import { useState, type SubmitEvent } from 'react';
import { actions, isInputError } from 'astro:actions';

const inputClass =
    'w-full border-[3px] border-ink bg-cream px-4 py-3 font-grotesk text-ink placeholder:text-ink/40 transition-all duration-100 focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-nb focus:outline-none';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type FieldErrors = Partial<Record<string, string[]>>;

function Field({ id, label, errors, children }: { id: string; label: string; errors?: string[]; children: React.ReactNode }) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block font-display text-xs uppercase tracking-wide">
                {label} <span className="text-hotpink" aria-hidden="true">*</span>
            </label>
            {children}
            {errors?.[0] && (
                <p id={`${id}-error`} className="mt-1 text-sm font-bold text-hotpink">
                    {errors[0]}
                </p>
            )}
        </div>
    );
}

export default function ContactForm() {
    const [status, setStatus] = useState<Status>('idle');
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus('sending');
        setFieldErrors({});

        // Astro Action: validated on the server with the same zod schema,
        // fully typed on the client. No hand-written fetch() or API route.
        const { error } = await actions.contact(new FormData(form));

        if (!error) {
            form.reset();
            setStatus('sent');
            return;
        }

        if (isInputError(error)) {
            setFieldErrors(error.fields);
            setStatus('idle');
        } else {
            setStatus('error');
        }
    }

    const fieldProps = (name: string) => ({
        id: name,
        name,
        required: true,
        'aria-invalid': fieldErrors[name] ? true : undefined,
        'aria-describedby': fieldErrors[name] ? `${name}-error` : undefined,
    });

    return (
        <div>
            {status === 'sent' && (
                <div role="status" className="nb-card mb-8 flex items-center justify-between gap-4 bg-lime p-5">
                    <p className="font-display text-sm uppercase md:text-base">
                        Let's do this!!! <span className="font-grotesk font-normal normal-case">Message sent.</span>
                    </p>
                    <button type="button" onClick={() => setStatus('idle')} aria-label="Dismiss" className="nb-icon h-9 w-9 shrink-0">
                        <svg className="h-5 w-5 fill-ink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </button>
                </div>
            )}

            {status === 'error' && (
                <div role="alert" className="nb-card mb-8 bg-hotpink p-5 text-ink">
                    <p className="font-display text-sm uppercase">Something went wrong sending that. Please try again or email me directly.</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="nb-card bg-white p-7 md:p-9">
                <p className="mb-5 font-grotesk text-sm text-ink/60">
                    Fields marked <span className="font-bold text-hotpink">*</span> are required.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="first_name" label="First Name" errors={fieldErrors.first_name}>
                        <input type="text" autoComplete="given-name" className={inputClass} {...fieldProps('first_name')} />
                    </Field>
                    <Field id="last_name" label="Last Name" errors={fieldErrors.last_name}>
                        <input type="text" autoComplete="family-name" className={inputClass} {...fieldProps('last_name')} />
                    </Field>
                </div>

                <div className="mt-5">
                    <Field id="email" label="Email" errors={fieldErrors.email}>
                        <input type="email" autoComplete="email" className={inputClass} {...fieldProps('email')} />
                    </Field>
                </div>

                <div className="mt-5">
                    <Field id="subject" label="Subject" errors={fieldErrors.subject}>
                        <input type="text" className={inputClass} {...fieldProps('subject')} />
                    </Field>
                </div>

                <div className="mt-5">
                    <Field id="message" label="Message" errors={fieldErrors.message}>
                        <textarea rows={4} className={`${inputClass} resize-none`} {...fieldProps('message')} />
                    </Field>
                </div>

                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="nb-btn mt-7 w-full bg-grape py-4 text-base text-white disabled:cursor-wait disabled:opacity-70"
                >
                    {status === 'sending' ? 'Sending…' : 'Send message →'}
                </button>
            </form>
        </div>
    );
}
