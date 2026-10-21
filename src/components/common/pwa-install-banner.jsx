import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

/**
 * PWAInstallBanner - Task 7 Priority P0
 * Captures `beforeinstallprompt` to offer a 1-tap install prompt for mobile & offline foraging.
 */
export const PWAInstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if dismissed previously this session
    if (sessionStorage.getItem('gg_pwa_dismissed')) {
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('gg_pwa_dismissed', 'true');
    }
  };

  if (!showBanner) return null;

  return (
    <div
      role="banner"
      className="fixed top-20 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 animate-fade-in-down"
    >
      <div className="flex items-center justify-between p-3.5 px-4 rounded-2xl bg-slate-950/95 border border-amber-500/40 shadow-2xl backdrop-blur-xl text-white">
        <div className="flex items-center gap-3 min-w-0 pr-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
            <Download size={16} />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-white truncate">Install Golden Grace App</h4>
            <p className="text-[10px] text-gray-400 truncate">Offline foraging & fast 1-tap reordering</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstall}
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss install banner"
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;
