// Small building blocks for table-based email HTML. Arguments that are
// already HTML (`html`) are inserted as-is, so escape user input first.

const brand = '#7c3aed';

/** Padded table row; every block in the layout is one of these. */
export const row = (html: string, padding = '16px 32px 0') =>
    `<tr><td class="pad" style="padding:${padding};">${html}</td></tr>`;

export const label = (text: string, marginBottom = 4) =>
    `<p class="label" style="margin:0 0 ${marginBottom}px; font-size:11px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; color:#9ca3af;">${text}</p>`;

/** Label + bold value, e.g. "Subject / Hello there". */
export const field = (name: string, valueHtml: string) =>
    row(label(name) + `<p class="text-main" style="margin:0; font-size:15px; color:#111827; font-weight:600;">${valueHtml}</p>`);

/** Label + grey box for multi-line text. */
export const textBlock = (name: string, html: string) =>
    row(
        label(name, 8) +
            `<div class="msg-box" style="font-size:15px; line-height:1.6; color:#374151; background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:16px 18px; word-break:break-word;">${html}</div>`,
    );

export const divider = () =>
    row('<hr class="divider" style="border:none; border-top:1px solid #e5e7eb; margin:0; height:0;">');

export const button = (href: string, text: string) => `
    <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
            <td style="background-color:${brand}; border-radius:8px;">
                <a href="${href}" style="display:inline-block; padding:12px 26px; font-size:14px; font-weight:600; color:#ffffff; text-decoration:none;">${text}</a>
            </td>
        </tr>
    </table>`;

export const muted = (html: string) =>
    `<p class="text-muted" style="margin:12px 0 0; font-size:13px; color:#6b7280;">${html}</p>`;
