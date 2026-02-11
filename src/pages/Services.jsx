import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ChevronRight, Sparkles, Shield, Droplets, Car, Wrench, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

const Services = () => {
  const { lang } = useParams()
  const { t } = useTranslation('services')
  const { t: tCommon } = useTranslation('common')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Helper for localized paths
  const localePath = (path) => `/${lang}${path}`

  const categories = [
    { id: 'all', name: t('categories.all'), icon: Car },
    { id: 'nettoyage', name: t('categories.nettoyage'), icon: Droplets },
    { id: 'protection', name: t('categories.protection'), icon: Shield },
    { id: 'correction', name: t('categories.correction'), icon: Sparkles },
  ]

  const packs = [
    {
      id: 1,
      key: 'lavageSimple',
      category: 'nettoyage',
      price: { small: 150, medium: 160, large: 180, xlarge: 190 },
      duration: '1h30-2h15',
      popular: false,
    },
    {
      id: 2,
      key: 'lavageProfondeur',
      category: 'nettoyage',
      price: { small: 300, medium: 325, large: 350, xlarge: 375 },
      duration: '3h-3h45',
      popular: true,
    },
    {
      id: 3,
      key: 'polishCorrectif',
      category: 'correction',
      price: { small: 1000, medium: 1200, large: 1400, xlarge: 1600 },
      duration: lang === 'fr' ? '1-3 jours' : '1-3 days',
      popular: false,
      isRange: true,
      hasNote: true,
    },
    {
      id: 4,
      key: 'ceramiquePro',
      category: 'protection',
      price: { small: 2000, medium: 2200, large: 2400, xlarge: 2600 },
      duration: lang === 'fr' ? '2-4 jours' : '2-4 days',
      popular: true,
      isRange: true,
      hasNote: true,
    },
    {
      id: 5,
      key: 'cire',
      category: 'protection',
      price: { small: 175, medium: 200, large: 225, xlarge: 250 },
      duration: '2h-2h30',
      popular: false,
    }
  ]

  const extras = [
    { key: 'ceramiqueVitres', price: 250 },
    { key: 'ceramiqueJantesVisibles', price: 250 },
    { key: 'ceramiqueJantesComplete', price: 600 },
    { key: 'renovationPhares', price: 110 },
    { key: 'nettoyageMoteur', price: 100 },
    { key: 'traitementCuir', price: 250 },
    { key: 'shampoingSieges', price: 250 },
    { key: 'renovationPlastiques', price: 200 },
  ]

  const serviceLinks = [
    { name: tCommon('serviceNames.lavage'), path: localePath('/services/lavage') },
    { name: tCommon('serviceNames.polish'), path: localePath('/services/polish') },
    { name: tCommon('serviceNames.ceramique'), path: localePath('/services/ceramique') },
    { name: tCommon('serviceNames.cire'), path: localePath('/services/cire') },
  ]

  const filteredPacks = selectedCategory === 'all'
    ? packs
    : packs.filter(pack => pack.category === selectedCategory)

  return (
    <>
      <SEOHead page="services" />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-sand-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">{t('hero.label')}</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mt-3 mb-6">
              {t('hero.title')}<span className="text-primary-500">.</span>
            </h1>
            <p className="text-lg text-dark-500">
              {t('hero.description')}
            </p>
          </motion.div>

          {/* Quick links to service pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {serviceLinks.map((service) => (
              <Link
                key={service.name}
                to={service.path}
                className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-dark-700 hover:text-dark-900 hover:bg-sand-100 border border-sand-200 hover:border-sand-300 transition-all"
              >
                {service.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter - non sticky */}
      <section className="py-8 bg-sand-100 border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-dark-900 text-white'
                    : 'bg-white text-dark-600 hover:bg-sand-200 hover:text-dark-900 border border-sand-300'
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packs Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPacks.map((pack, index) => {
              const packData = t(`packs.items.${pack.key}`, { returnObjects: true })
              return (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-3xl border ${
                    pack.popular
                      ? 'bg-sand-300/20 border-sand-400'
                      : 'bg-white border-sand-200'
                  } overflow-hidden`}
                >
                  {pack.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-dark-900 text-white text-xs font-semibold">
                        <Star className="w-3 h-3 mr-1" />
                        {t('packs.popular')}
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-dark-900 mb-2">{packData.name}</h3>
                      <p className="text-dark-500 text-sm">{packData.description}</p>
                    </div>

                    <div className="mb-6">
                      <div className="text-4xl font-bold text-dark-900 mb-1">
                        {pack.isRange ? (
                          <>{t('packs.fromPrice')} CHF {pack.price.small}.-</>
                        ) : (
                          <>CHF {pack.price.small}.-</>
                        )}
                      </div>
                      <p className="text-dark-400 text-sm">
                        {t('packs.priceCoupe')}: CHF {pack.price.medium}.- | {t('packs.priceBerline')}: CHF {pack.price.large}.- | {t('packs.priceMonospace')}: CHF {pack.price.xlarge}.-
                      </p>
                      {pack.hasNote && (
                        <p className="text-dark-400 text-xs mt-1 italic">
                          {t('packs.priceNote')}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center text-dark-500 text-sm mb-6">
                      <Wrench className="w-4 h-4 mr-2" />
                      {t('packs.duration')}: {pack.duration}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {packData.features?.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <Check className="w-5 h-5 text-dark-900 mr-3 flex-shrink-0" />
                          <span className="text-dark-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={localePath('/configurateur')}
                      className={`w-full flex items-center justify-center py-3 rounded-full font-semibold transition-all ${
                        pack.popular
                          ? 'bg-dark-900 hover:bg-dark-800 text-white'
                          : 'bg-white hover:bg-sand-100 text-dark-900 border-2 border-dark-900'
                      }`}
                    >
                      {t('packs.reserve')}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Additionnels */}
      <section className="py-20 bg-sand-300/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-dark-900 mb-4">
              {t('extras.title')}
            </h2>
            <p className="text-dark-500">
              {t('extras.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {extras.map((extra, index) => (
              <motion.div
                key={extra.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-sand-200"
              >
                <span className="text-dark-700">{t(`extras.items.${extra.key}`)}</span>
                <span className="text-dark-900 font-semibold">CHF {extra.price}.-</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-900 mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-dark-500 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={localePath('/configurateur')}
                className="inline-flex items-center justify-center px-8 py-4 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-full transition-all"
              >
                {t('cta.configureBtn')}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to={localePath('/contact')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-sand-100 text-dark-900 font-semibold rounded-full border-2 border-dark-900 transition-all"
              >
                {t('cta.contactBtn')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Services
