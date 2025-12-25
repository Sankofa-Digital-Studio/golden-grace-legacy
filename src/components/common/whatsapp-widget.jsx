import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppWidget = () => (
    <a 
        href="https://wa.me/27662022100" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
    >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" fill="white" />
        <span className="hidden md:block absolute right-full mr-4 bg-white text-black px-3 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">Chat with us</span>
    </a>
);

export default WhatsAppWidget;