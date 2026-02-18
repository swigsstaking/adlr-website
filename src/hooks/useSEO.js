import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import seoData from '../data/seo.json';

/**
 * Hook pour récupérer les données SEO d'une page avec support multilingue
 * @param {string} page - Nom de la page (home, services, services/lavage, services/polish, etc.)
 * @returns {object} Données SEO de la page
 */
export const useSEO = (page = 'home') => {
  const { lang } = useParams();
  const currentLang = lang || seoData.global.defaultLanguage || 'fr';

  const seo = useMemo(() => {
    const global = seoData.global;
    const pageData = seoData.pages[page] || seoData.pages.home;

    // Get language-specific SEO or fallback to default language
    const pageSEO = pageData[currentLang] || pageData[global.defaultLanguage] || pageData;

    // Build path based on page key
    const langPrefix = `/${currentLang}`;
    const pagePath = page === 'home' ? '' : `/${page}`;
    const fullPath = `${langPrefix}${pagePath}`;

    return {
      // Données de la page
      title: pageSEO.title,
      description: pageSEO.description,
      keywords: pageSEO.keywords,

      // Open Graph
      ogTitle: pageSEO.ogTitle || pageSEO.title,
      ogDescription: pageSEO.ogDescription || pageSEO.description,
      ogImage: pageSEO.ogImage || global.ogImage || global.logo,
      ogUrl: `${global.siteUrl}${fullPath}`,

      // Twitter Card
      twitterCard: pageSEO.twitterCard || 'summary_large_image',

      // Autres
      canonical: pageSEO.canonical || `${global.siteUrl}${fullPath}`,
      robots: pageSEO.robots || 'index,follow',
      language: currentLang,

      // Global
      siteName: global.siteName,
      siteUrl: global.siteUrl,
      favicon: global.favicon,

      // Hreflang data for SEO
      supportedLanguages: global.supportedLanguages || ['fr', 'en'],
      defaultLanguage: global.defaultLanguage || 'fr',
      currentPath: pagePath,
    };
  }, [page, currentLang]);

  return seo;
};

export default useSEO;
