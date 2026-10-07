import { row } from './components';

interface LayoutOptions {
    /** <title> and hidden inbox preview text (already escaped) */
    title: string;
    preheader: string;
    /** Small purple label above the heading */
    eyebrow: string;
    heading: string;
    subheading?: string;
    /** Table rows built from ./components */
    body: string;
}

/** Branded email shell: light/dark styles, card, accent bar, header and footer. */
export function emailLayout({ title, preheader, eyebrow, heading, subheading, body }: LayoutOptions) {
    const header = row(
        `<p class="label" style="margin:0; font-size:12px; font-weight:600; letter-spacing:0.8px; text-transform:uppercase; color:#7c3aed;">${eyebrow}</p>
         <h1 class="text-main" style="margin:8px 0 0; font-size:20px; line-height:1.35; color:#111827; font-weight:700;">${heading}</h1>` +
            (subheading ? `<p class="text-muted" style="margin:6px 0 0; font-size:13px; color:#6b7280;">${subheading}</p>` : ''),
        '26px 32px 6px',
    );

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>${title}</title>
    <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; }
        a { color: #7c3aed; }
        @media (prefers-color-scheme: dark) {
            .email-bg   { background-color: #0f0f10 !important; }
            .card       { background-color: #1a1a1d !important; border-color: #2a2a2e !important; }
            .text-main  { color: #ededed !important; }
            .text-muted { color: #9a9aa0 !important; }
            .label      { color: #8a8a90 !important; }
            .divider    { border-color: #2a2a2e !important; }
            .msg-box    { background-color: #232327 !important; border-color: #2a2a2e !important; color: #e5e5e5 !important; }
            .footer-text, .footer-text a { color: #7a7a80 !important; }
        }
        @media only screen and (max-width: 600px) {
            .card { border-radius: 0 !important; }
            .pad  { padding-left: 22px !important; padding-right: 22px !important; }
        }
    </style>
</head>
<body class="email-bg" style="margin:0; padding:0; background-color:#f3f4f6; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
        ${preheader}
        &#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-bg" style="background-color:#f3f4f6;">
        <tr>
            <td align="center" style="padding:32px 12px;">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" class="card" style="max-width:600px; width:100%; background-color:#ffffff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
                    <tr><td style="height:4px; line-height:4px; font-size:0; background-color:#7c3aed;">&nbsp;</td></tr>
                    ${header}
                    ${body}
                </table>
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">
                    <tr>
                        <td class="pad" style="padding:18px 32px; text-align:center;">
                            <p class="footer-text" style="margin:0; font-size:12px; color:#9ca3af;">
                                Sent from the contact form on
                                <a href="https://www.stephenenikanoselu.com" style="color:#9ca3af; text-decoration:underline;">stephenenikanoselu.com</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
