import { useEffect } from 'react';

const useSEO = (title, description) => {
  useEffect(() => {
    // Update Title
    document.title = `${title} | Golden Grace Honey`;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      // Create it if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);
};

export default useSEO;
