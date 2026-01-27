import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || 'adlr';

export const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/public/sites/${SITE_SLUG}`);
        const data = await response.json();

        if (data.success && data.data) {
          setSiteInfo(data.data);
        }
      } catch (error) {
        console.error('Erreur chargement site info:', error);
        // Fallback to default site info
        setSiteInfo({
          name: 'ADLR Cosmetic Auto',
          description: 'Spécialiste du detailing automobile en Suisse. Nettoyage, polish, céramique et protection de votre véhicule.',
          contact: {
            phone: '+41 XX XXX XX XX',
            email: 'contact@adlrcosmeticauto.ch',
            address: 'Suisse',
          },
          social: {
            instagram: 'https://instagram.com/adlrcosmeticauto',
            facebook: 'https://facebook.com/adlrcosmeticauto',
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSiteInfo();
  }, []);

  return { siteInfo, loading };
};
