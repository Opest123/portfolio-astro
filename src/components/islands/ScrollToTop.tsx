import { useEffect, useState } from 'react';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 500);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            tabIndex={visible ? 0 : -1}
            className={`nb-icon fixed bottom-6 right-6 z-40 h-14 w-14 bg-lime transition-all duration-200 ${
                visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
            }`}
        >
            <svg className="h-7 w-7 fill-ink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4l-8 8h5v8h6v-8h5z" />
            </svg>
        </button>
    );
}
