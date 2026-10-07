import { useEffect, useState, type ReactNode } from 'react';

interface Props {
    items: { id: string; label: string }[];
    /** Static HTML passed from Astro (the social icons) */
    children?: ReactNode;
}

export default function MobileMenu({ items, children }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen]);

    const close = () => setIsOpen(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="nb-icon lg:hidden" aria-label="Open menu" aria-expanded={isOpen}>
                <svg className="h-6 w-6 fill-ink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                </svg>
            </button>

            {/*
                The drawer is always rendered (so the layout's active-nav script
                can find its links) and toggled with CSS transitions. `inert`
                keeps it out of the tab order while closed.
            */}
            <div className={`fixed inset-0 z-[60] lg:hidden ${isOpen ? '' : 'pointer-events-none'}`} inert={!isOpen}>
                <div
                    className={`absolute inset-0 bg-ink/40 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={close}
                />

                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu"
                    className={`absolute right-0 top-0 flex h-full w-72 max-w-[80%] flex-col border-l-[3px] border-ink bg-cream p-6 transition-transform ${
                        isOpen ? 'translate-x-0 duration-200 ease-out' : 'translate-x-full duration-150 ease-in'
                    }`}
                >
                    <div className="mb-8 flex items-center justify-between">
                        <span className="font-display text-lg uppercase">Menu</span>
                        <button onClick={close} className="nb-icon" aria-label="Close menu">
                            <svg className="h-6 w-6 fill-ink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col gap-3">
                        {items.map((item) => (
                            <a key={item.id} href={`#${item.id}`} data-nav={item.id} onClick={close} className="nb-btn w-full justify-start">
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="mt-auto flex gap-3 pt-8">{children}</div>
                </div>
            </div>
        </>
    );
}
