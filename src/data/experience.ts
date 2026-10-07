export interface Role {
    years: string;
    company: string;
    role: string;
    location: string;
    /** Tailwind classes for the date tag */
    tag: string;
    note?: string;
    highlight: string;
    stack: string[];
}

export const roles: Role[] = [
    {
        years: 'Jan 2026 – Aug 2026', company: 'Pooltrackr', role: 'Senior Full Stack Developer',
        location: 'Smithfield, NSW · Remote', tag: 'bg-lime',
        highlight: 'Shipping production React and Next.js features for a SaaS platform that serves thousands of users, including role-based access, dashboards, and scheduling.',
        stack: ['React', 'Next.js', 'TypeScript', 'Laravel', 'MySQL', 'Redis', 'AWS', 'Docker'],
    },
    {
        years: 'Jan 2025 – Present', company: 'Ilera Travel Health', role: 'Chief Technology Officer',
        location: 'Remote', tag: 'bg-grape text-white', note: 'Part-time',
        highlight: 'Owning the technical direction end-to-end for a travel-health booking platform, covering Node.js APIs, AWS and Terraform infrastructure, and both a React web app and a Flutter mobile app.',
        stack: ['Node.js', 'Terraform', 'AWS', 'Cloudflare', 'React', 'Flutter', 'MongoDB', 'GitHub Actions'],
    },
    {
        years: 'Oct 2025 – Jan 2026', company: 'Allegiant Technology', role: 'Full Stack Developer (Contract)',
        location: 'Gold Coast, QLD · Remote', tag: 'bg-sky',
        highlight: 'Designed, built, and tested UI and server-side components in Laravel, Go, and Vue/Nuxt, delivered through CI/CD with full test coverage.',
        stack: ['Laravel', 'Go', 'Vue.js', 'Nuxt.js', 'Inertia.js', 'MySQL', 'Redis', 'Docker', 'AWS'],
    },
    {
        years: '2022 – Aug 2025', company: 'Fintelligence', role: 'Senior Software Developer',
        location: 'Gold Coast, QLD', tag: 'bg-hotpink text-white',
        highlight: 'Rebuilt a multi-tenant loan and broker platform and cut core API response times by 40 percent. Shipped a React Native app that drove a 30 percent increase in mobile adoption.',
        stack: ['Laravel', 'Vue.js', 'React Native', 'MySQL', 'Redis', 'Docker', 'AWS'],
    },
    {
        years: '2020 – 2022', company: 'Evolt Active Pty Ltd', role: 'Web Developer',
        location: 'Gold Coast, QLD', tag: 'bg-sun',
        highlight: 'Built the Laravel and Node.js services behind the Evolt 360 body-composition platform, and shipped health features in React and React Native.',
        stack: ['Laravel', 'Node.js', 'React', 'React Native', 'MySQL', 'AWS'],
    },
    {
        years: '2019 – 2020', company: 'Coding Labs Pty Ltd', role: 'Full Stack Developer',
        location: 'Gold Coast, QLD', tag: 'bg-lime',
        highlight: 'Developed custom CMS solutions and client portals with Laravel, CodeIgniter, and Inertia.js.',
        stack: ['Laravel', 'CodeIgniter', 'Inertia.js', 'Tailwind', 'MySQL'],
    },
    {
        years: '2018', company: 'Jump On and Stay', role: 'Junior Web Developer',
        location: 'Gold Coast, QLD', tag: 'bg-white',
        highlight: 'Helped build a tourism-focused booking platform, contributing both front-end and back-end features.',
        stack: ['PHP (Laravel)', 'Vue.js', 'Bootstrap', 'MySQL'],
    },
];
