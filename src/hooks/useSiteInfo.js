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
          // Merge API data with defaults so contact info always shows
          setSiteInfo({
            ...DEFAULTS,
            ...data.data,
            contact: { ...DEFAULTS.contact, ...data.data.contact },
            social: { ...DEFAULTS.social, ...data.data.social },
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
