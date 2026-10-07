import type { ImageMetadata } from 'astro';
import memoryWithYou from '../assets/images/memorywithyou.png';
import overcomers from '../assets/images/overcomerssupportservices.png';

export interface Project {
    name: string;
    url: string;
    /** Imported from src/assets so astro:assets can resize + convert it at build time */
    image: ImageMetadata;
    blurb: string;
    stack: string[];
    bg: string;
}

export const projects: Project[] = [
    {
        name: 'MemoryWithYou',
        url: 'https://www.memorywithyou.com/',
        image: memoryWithYou,
        blurb: 'AI event planner + marketplace connecting organisers, guests and vendors. Built and shipped solo.',
        stack: ['Next.js', 'TypeScript', 'Node.js', 'Tailwind'],
        bg: 'bg-grape',
    },
    {
        name: 'Overcomers Support Services',
        url: 'https://overcomerssupportservices.com.au/',
        image: overcomers,
        blurb: 'Responsive NDIS service platform with an admin panel.',
        stack: ['Laravel', 'Tailwind', 'Alpine.js'],
        bg: 'bg-hotpink',
    },
];
