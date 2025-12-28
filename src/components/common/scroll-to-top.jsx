import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
   const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.pageYOffset > 500);
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    return isVisible ? (
        <button onClick={scrollToTop} className="fixed bottom-6 left-6 z-40 bg-white/10 hover:bg-amber-500 text-white hover:text-black p-3 rounded-full shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300 group">
            <ArrowUp size={20} />
        </button>
    ) : null;
};

export default ScrollToTop;
