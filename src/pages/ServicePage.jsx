import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Check, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

/**
 * ServicePage - Template pour les pages de services individuelles
 */
const ServicePage = ({
  service,
  seoPage = 'services'
}) => {
  const { lang } = useParams()
  const { t } = useTranslation('services')

  // Helper for localized paths
  const localePath = (path) => `/${lang}${path}`
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  return (
    <>
      <SEOHead page={seoPage} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background Image/Video */}
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0"
        >
          {service.video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={service.video} type="video/mp4" />
            </video>
          ) : (
            <img
              src={service.heroImage || service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-white/60 text-sm uppercase tracking-widest mb-4">
                {service.category || 'Service'}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black text-white mb-6">
                {service.title}
                <span className="text-sand-300">.</span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                {service.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-dark-900 mb-8">
                {service.descriptionTitle || 'Notre expertise'}
              </h2>
              <div className="prose prose-lg text-dark-600">
                {service.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={service.descriptionImage || service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
      {service.features && service.features.length > 0 && (
        <section className="py-20 lg:py-32 bg-sand-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-black text-dark-900 mb-4">
                {t('servicePages.common.included')}
              </h2>
              <p className="text-dark-500 text-lg max-w-2xl mx-auto">
                {service.featuresSubtitle || t('servicePages.common.includedSubtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-dark-900 flex items-center justify-center mb-4">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-900 mb-2">
                    {feature.title}
                  </h3>
                  {feature.description && (
                    <p className="text-dark-500 text-sm">
                      {feature.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {service.pricing && (
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-black text-dark-900 mb-4">
                {t('servicePages.common.pricing')}
              </h2>
              <p className="text-dark-500 text-lg">
                {t('servicePages.common.pricingSubtitle')}
              </p>
            </motion.div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${service.pricing.length === 4 ? 'lg:grid-cols-4' : 'md:grid-cols-3'} gap-6 max-w-5xl mx-auto`}>
              {service.pricing.map((price, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-3xl p-6 text-center ${
                    index === 1
                      ? 'bg-dark-900 text-white shadow-2xl sm:scale-105'
                      : 'bg-sand-100'
                  }`}
                >
                  <h3 className={`text-base font-semibold mb-2 ${
                    index === 1 ? 'text-white' : 'text-dark-900'
                  }`}>
                    {price.category}
                  </h3>
                  <p className={`text-xs mb-4 ${
                    index === 1 ? 'text-white/60' : 'text-dark-500'
                  }`}>
                    {price.examples}
                  </p>
                  <div className={`text-3xl font-bold mb-2 ${
                    index === 1 ? 'text-white' : 'text-dark-900'
                  }`}>
                    {price.priceMax ? (
                      <>{price.price}-{price.priceMax}.-</>
                    ) : (
                      <>CHF {price.price}.-</>
                    )}
                  </div>
                  {price.duration && (
                    <p className={`text-sm ${
                      index === 1 ? 'text-white/60' : 'text-dark-500'
                    }`}>
                      {t('servicePages.common.duration')}: {price.duration}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
            {service.priceNote && (
              <p className="text-center text-dark-400 text-sm mt-6 italic">
                {service.priceNote}
              </p>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-dark-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
              {t('servicePages.common.ctaTitle')}
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              {t('servicePages.common.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={localePath('/configurateur')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-sand-100 text-dark-900 font-semibold rounded-full transition-all duration-300 group"
              >
                {t('servicePages.common.configureService')}
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={localePath('/contact')}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white text-white font-semibold rounded-full transition-all duration-300"
              >
                {t('servicePages.common.contactUs')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-20 lg:py-32 bg-sand-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-dark-900">
              {t('servicePages.common.otherServices')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {service.otherServices?.map((other, index) => (
              <Link
                key={index}
                to={localePath(other.link)}
                className="group bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-semibold text-dark-900 group-hover:text-dark-600 transition-colors">
                  {other.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicePage
