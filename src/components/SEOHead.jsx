import { Helmet } from 'react-helmet-async';
import { useSEO } from '../hooks/useSEO';

/**
 * Composant pour gérer les meta tags SEO avec support multilingue
 * @param {string} page - Nom de la page
 */
const SEOHead = ({ page = 'home' }) => {
  const seo = useSEO(page);

  // Build hreflang URLs
  const hreflangUrls = seo.supportedLanguages.map(lang => ({
    lang,
    url: `${seo.siteUrl}/${lang}${seo.currentPath}`
  }));

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={seo.language} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="robots" content={seo.robots} />
      <link rel="canonical" href={seo.canonical} />

      {/* Favicon */}
      {seo.favicon && <link rel="icon" href={seo.favicon} />}

      {/* Hreflang tags for multilingual SEO */}
      {hreflangUrls.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${seo.siteUrl}/${seo.defaultLanguage}${seo.currentPath}`} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:url" content={seo.ogUrl} />
      <meta property="og:site_name" content={seo.siteName} />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      <meta property="og:locale" content={seo.language === 'fr' ? 'fr_CH' : 'en_US'} />
      {/* Alternate locales */}
      {seo.supportedLanguages
        .filter(lang => lang !== seo.language)
        .map(lang => (
          <meta key={lang} property="og:locale:alternate" content={lang === 'fr' ? 'fr_CH' : 'en_US'} />
        ))
      }

      {/* Twitter Card */}
      <meta name="twitter:card" content={seo.twitterCard} />
      <meta name="twitter:title" content={seo.ogTitle} />
      <meta name="twitter:description" content={seo.ogDescription} />
      {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#000000" />
    </Helmet>
  );
};

export default SEOHead;
