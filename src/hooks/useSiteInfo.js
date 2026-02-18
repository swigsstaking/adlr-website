import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || 'adlr';

const DEFAULTS = {
  name: 'ADLR Cosmetic Auto',
  description: 'Spécialiste du detailing automobile en Suisse. Nettoyage, polish, céramique et protection de votre véhicule.',
  contact: {
    phone: '+41 79 949 06 30',
    email: 'info@adlrcosmeticauto.ch',
    address: 'Suisse',
  },
  social: {
    instagram: 'https://instagram.com/adlrcosmeticauto',
    facebook: 'https://facebook.com/adlrcosmeticauto',
  }
};

export const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/public/sites/${SITE_SLUG}`);
        const data = await response.json();

        if (data.success && data.data) {
          // Merge API data with defaults, ignoring empty strings
          const strip = (obj) =>
            Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== ''));
          const api = data.data;
          setSiteInfo({
            ...DEFAULTS,
            ...api,
            contact: { ...DEFAULTS.contact, ...(api.contact ? strip(api.contact) : {}) },
            social: { ...DEFAULTS.social, ...(api.social ? strip(api.social) : {}) },
          });
        }
      } catch (error) {
        console.error('Erreur chargement site info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteInfo();
  }, []);

  return { siteInfo, loading };
};
