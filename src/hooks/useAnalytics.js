import { useEffect } from 'react';

const useAnalytics = (pageName) => {
  useEffect(() => {
    // Simulate logging to an analytics service
    console.log(`[Analytics] Page View: ${pageName} | Timestamp: ${new Date().toISOString()}`);
    
    // Example Integration (Commented out):
    // if (window.gtag) {
    //   window.gtag('event', 'page_view', { page_title: pageName });
    // }
  }, [pageName]);
};

export default useAnalytics;