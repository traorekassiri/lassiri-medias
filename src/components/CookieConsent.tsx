import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-4xl mx-auto bg-white border border-zinc-200 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-bold text-zinc-900">Respect de votre vie privée</h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Kassiri Pulse utilise des cookies pour améliorer votre expérience, analyser le trafic et diffuser des publicités personnalisées via Google AdSense. En continuant à naviguer, vous acceptez notre utilisation des cookies.
          </p>
        </div>
        <div className="flex items-center space-x-4 shrink-0">
          <button 
            onClick={() => setIsVisible(false)}
            className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            Refuser
          </button>
          <button 
            onClick={acceptCookies}
            className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
          >
            Accepter tout
          </button>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
