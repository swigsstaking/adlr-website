import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Check, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SEOHead from '../../components/SEOHead'

const LavageService = () => {
  const { lang } = useParams()
  const { t } = useTranslation('services')
  const [activeTab, setActiveTab] = useState(0)

  const serviceData = t('servicePages.lavage', { returnObjects: true })
  const vehicleCategories = t('servicePages.vehicleCategories', { returnObjects: true })
  const common = t('servicePages.common', { returnObjects: true })

  const localePath = (path) => `/${lang}${path}`

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  const categoryLabels = [
    { label: vehicleCategories.compact, examples: vehicleCategories.compactExamples },
    { label: vehicleCategories.coupe, examples: vehicleCategories.coupeExamples },
    { label: vehicleCategories.berline, examples: vehicleCategories.berlineExamples },
    { label: vehicleCategories.monospace, examples: vehicleCategories.monospaceExamples },
  ]

  const subServices = serviceData.subServices || []

  const otherServices = [
    { title: t('servicePages.polish.title'), link: '/services/polish' },
    { title: t('servicePages.ceramique.title'), link: '/services/ceramique' },
    { title: t('servicePages.cire.title'), link: '/services/cire' },
    { title: common.allServices, link: '/services' },
  ]

  return (
    <>
      <SEOHead page="services/lavage" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://swigs.online/uploads/adlr/1770457763210-200960664.webm" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-white/60 text-sm uppercase tracking-widest mb-4">
                {serviceData.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black text-white mb-6">
                {serviceData.title}
                <span className="text-sand-300">.</span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                {serviceData.subtitle}
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
              <h2 className="text-4xl md:text-5xl font-display font-black text-dark-900 mb-8">
                {serviceData.descriptionTitle}
              </h2>
              <div className="prose prose-lg text-dark-600">
                {serviceData.description.split('\n\n').map((paragraph, index) => (
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
                  src="https://swigs.online/uploads/adlr/1769941982998-455340523.webp"
                  alt={serviceData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sub-Services Tabs */}
      <section className="py-20 lg:py-32 bg-sand-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm">
              {subServices.map((sub, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    activeTab === index
                      ? 'bg-dark-900 text-white'
                      : 'text-dark-600 hover:text-dark-900'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          {subServices.map((sub, tabIndex) => (
            tabIndex === activeTab && (
              <motion.div
                key={tabIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl md:text-5xl font-display font-black text-dark-900 mb-4">
                    {sub.name}
                  </h2>
                  <p className="text-dark-500 text-lg max-w-2xl mx-auto">
                    {common.includedSubtitle}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                  {sub.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
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

                {/* Pricing */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h3 className="text-3xl font-display font-black text-dark-900 mb-4">
                    {common.pricing}
                  </h3>
                  <p className="text-dark-500 text-lg">
                    {common.pricingSubtitle}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                  {sub.pricing.map((price, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`rounded-3xl p-6 text-center ${
                        index === 1
                          ? 'bg-dark-900 text-white shadow-2xl sm:scale-105'
                          : 'bg-white'
                      }`}
                    >
                      <h4 className={`text-base font-semibold mb-2 ${
                        index === 1 ? 'text-white' : 'text-dark-900'
                      }`}>
                        {categoryLabels[index]?.label}
                      </h4>
                      <p className={`text-xs mb-4 ${
                        index === 1 ? 'text-white/60' : 'text-dark-500'
                      }`}>
                        {categoryLabels[index]?.examples}
                      </p>
                      <div className={`text-3xl font-bold mb-2 ${
                        index === 1 ? 'text-white' : 'text-dark-900'
                      }`}>
                        CHF {price.price}.-
                      </div>
                      <p className={`text-sm ${
                        index === 1 ? 'text-white/60' : 'text-dark-500'
                      }`}>
                        {common.duration}: {price.duration}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-dark-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
              {common.ctaTitle}
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              {common.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={localePath('/configurateur')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-sand-100 text-dark-900 font-semibold rounded-full transition-all duration-300 group"
              >
                {common.configureService}
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={localePath('/contact')}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white text-white font-semibold rounded-full transition-all duration-300"
              >
                {common.contactUs}
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
              {common.otherServices}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherServices.map((other, index) => (
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

export default LavageService
