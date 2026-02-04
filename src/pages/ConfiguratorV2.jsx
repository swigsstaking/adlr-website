import { useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, ChevronLeft, Car, CarFront, Truck, Zap, Sparkles, Shield, Plus, Minus, Send, Lightbulb, Wrench, Droplets, Wind, Armchair, PaintBucket, CircleDot, Flame, X, ShoppingCart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

/**
 * ConfiguratorV2 - Design repensé avec approche visuelle
 * - Layout split-screen
 * - Récapitulatif visible en permanence
 * - Navigation fluide
 */
const ConfiguratorV2 = () => {
  const { lang } = useParams()
  const { t } = useTranslation('configurator')
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    vehicleType: null,
    basePack: null,
    options: [],
    contact: { name: '', email: '', phone: '', message: '' }
  })

  const vehicleTypes = [
    { id: 'compact', Icon: Car, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&auto=format&fit=crop', multiplier: 1 },
    { id: 'sedan', Icon: CarFront, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&auto=format&fit=crop', multiplier: 1.25 },
    { id: 'large', Icon: Truck, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&auto=format&fit=crop', multiplier: 1.5 },
    { id: 'supercar', Icon: Zap, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&auto=format&fit=crop', multiplier: 1.8 },
  ]

  const basePacks = [
    {
      id: 'eclat',
      basePrice: 150,
      duration: '2-3h',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'prestige',
      basePrice: 280,
      duration: '4-5h',
      popular: true,
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'excellence',
      basePrice: 450,
      duration: '6-8h',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'ceramique',
      basePrice: 800,
      duration: lang === 'fr' ? '2 jours' : '2 days',
      color: 'from-dark-800 to-dark-900',
    }
  ]

  const additionalOptions = [
    { id: 'headlights', price: 80, Icon: Lightbulb },
    { id: 'engine', price: 60, Icon: Wrench },
    { id: 'rainrepel', price: 50, Icon: Droplets },
    { id: 'ozone', price: 40, Icon: Wind },
    { id: 'leather', price: 120, Icon: Armchair },
    { id: 'plastics', price: 50, Icon: PaintBucket },
    { id: 'wheels', price: 80, Icon: CircleDot },
    { id: 'exhaust', price: 40, Icon: Flame },
  ]

  const getPrice = () => {
    if (!config.vehicleType || !config.basePack) return 0
    const vehicle = vehicleTypes.find(v => v.id === config.vehicleType)
    const pack = basePacks.find(p => p.id === config.basePack)
    const optionsTotal = config.options.reduce((sum, optId) => {
      const opt = additionalOptions.find(o => o.id === optId)
      return sum + (opt?.price || 0)
    }, 0)
    return Math.round(pack.basePrice * vehicle.multiplier + optionsTotal)
  }

  const toggleOption = (optionId) => {
    setConfig(prev => ({
      ...prev,
      options: prev.options.includes(optionId)
        ? prev.options.filter(id => id !== optionId)
        : [...prev.options, optionId]
    }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const canProceed = () => {
    switch (step) {
      case 1: return config.vehicleType !== null
      case 2: return config.basePack !== null
      case 3: return true
      case 4: return config.contact.name && config.contact.email && config.contact.phone
      default: return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(t('alerts.success'))
  }

  const selectedVehicle = vehicleTypes.find(v => v.id === config.vehicleType)
  const selectedPack = basePacks.find(p => p.id === config.basePack)

  return (
    <>
      <SEOHead page="configurator" />

      <div className="min-h-screen bg-sand-50 pt-24">
        {/* Header avec steps */}
        <div className="bg-white border-b border-sand-200">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 lg:max-w-[65%] px-6 lg:px-10 py-4">
              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-display font-bold text-dark-900">
                    {t('title')}
                  </h1>
                  <span className="text-sm text-dark-500">
                    {t('stepOf', { step, total: 4 })}
                  </span>
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex-1 flex items-center">
                      <div
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          s < step ? 'bg-dark-900' : s === step ? 'bg-dark-900' : 'bg-sand-300'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-156px)]">
          {/* Main Content Area */}
          <div className="flex-1 lg:max-w-[65%]">
            {/* Content */}
            <div className="p-6 lg:p-10 pb-32 lg:pb-10">
              <AnimatePresence mode="wait">
                {/* Step 1: Vehicle Type */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-3xl mx-auto"
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-display font-bold text-dark-900 mb-2">
                        {t('step1.title')}
                      </h2>
                      <p className="text-dark-500">
                        {t('step1.description')}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {vehicleTypes.map((vehicle) => (
                        <button
                          key={vehicle.id}
                          onClick={() => setConfig(prev => ({ ...prev, vehicleType: vehicle.id }))}
                          className={`group relative p-5 rounded-2xl border-2 transition-all text-left ${
                            config.vehicleType === vehicle.id
                              ? 'border-dark-900 bg-sand-100 shadow-lg'
                              : 'border-sand-200 bg-white hover:border-dark-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              config.vehicleType === vehicle.id ? 'bg-dark-900' : 'bg-sand-100'
                            }`}>
                              <vehicle.Icon className={`w-6 h-6 ${
                                config.vehicleType === vehicle.id ? 'text-white' : 'text-dark-700'
                              }`} />
                            </div>
                            {config.vehicleType === vehicle.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 bg-dark-900 rounded-full flex items-center justify-center"
                              >
                                <Check className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </div>
                          <h3 className="text-dark-900 font-bold text-lg">{t(`vehicles.${vehicle.id}.name`)}</h3>
                          <p className="text-dark-500 text-sm">{t(`vehicles.${vehicle.id}.subtitle`)}</p>
                          <p className="text-dark-400 text-xs mt-2">{t(`vehicles.${vehicle.id}.description`)}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Base Pack */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-3xl mx-auto"
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-display font-bold text-dark-900 mb-2">
                        {t('step2.title')}
                      </h2>
                      <p className="text-dark-500">
                        {t('step2.description')}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {basePacks.map((pack) => {
                        const price = Math.round(pack.basePrice * (selectedVehicle?.multiplier || 1))
                        const packData = t(`packs.${pack.id}`, { returnObjects: true })
                        return (
                          <button
                            key={pack.id}
                            onClick={() => setConfig(prev => ({ ...prev, basePack: pack.id }))}
                            className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all ${
                              config.basePack === pack.id
                                ? 'border-dark-900 shadow-lg'
                                : 'border-transparent bg-white hover:shadow-md'
                            }`}
                          >
                            <div className="flex items-stretch">
                              {/* Color bar */}
                              <div className={`w-2 bg-gradient-to-b ${pack.color}`} />

                              <div className="flex-1 p-5">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-lg font-bold text-dark-900">{packData.name}</h3>
                                      {pack.popular && (
                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                                          {t('packs.popular')}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-dark-500 text-sm">{packData.description}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-2xl font-bold text-dark-900">CHF {price}.-</p>
                                    <p className="text-dark-400 text-xs">{pack.duration}</p>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  {packData.features?.map((feature, i) => (
                                    <span key={i} className="px-2 py-1 bg-sand-100 text-dark-600 text-xs rounded-lg">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Check indicator */}
                              <div className={`w-12 flex items-center justify-center transition-colors ${
                                config.basePack === pack.id ? 'bg-dark-900' : 'bg-sand-100'
                              }`}>
                                {config.basePack === pack.id ? (
                                  <Check className="w-5 h-5 text-white" />
                                ) : (
                                  <div className="w-5 h-5 rounded-full border-2 border-sand-300" />
                                )}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Options */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-3xl mx-auto"
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-display font-bold text-dark-900 mb-2">
                        {t('step3.title')}
                      </h2>
                      <p className="text-dark-500">
                        {t('step3.description')}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {additionalOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => toggleOption(option.id)}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            config.options.includes(option.id)
                              ? 'border-dark-900 bg-dark-900 text-white'
                              : 'border-sand-200 bg-white hover:border-dark-300'
                          }`}
                        >
                          <option.Icon className={`w-6 h-6 mx-auto mb-2 ${
                            config.options.includes(option.id) ? 'text-white' : 'text-dark-600'
                          }`} />
                          <h3 className={`text-sm font-medium mb-1 ${
                            config.options.includes(option.id) ? 'text-white' : 'text-dark-900'
                          }`}>
                            {t(`options.${option.id}`)}
                          </h3>
                          <p className={`text-xs font-semibold ${
                            config.options.includes(option.id) ? 'text-white/80' : 'text-dark-500'
                          }`}>
                            +CHF {option.price}
                          </p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-xl mx-auto"
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-display font-bold text-dark-900 mb-2">
                        {t('step4.title')}
                      </h2>
                      <p className="text-dark-500">
                        {t('step4.description')}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-dark-700 text-sm font-medium mb-2">
                          {t('contact.name')} {t('contact.required')}
                        </label>
                        <input
                          type="text"
                          required
                          value={config.contact.name}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            contact: { ...prev.contact, name: e.target.value }
                          }))}
                          className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:ring-2 focus:ring-dark-900/20 focus:border-dark-900 transition-all"
                          placeholder={t('contact.namePlaceholder')}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-dark-700 text-sm font-medium mb-2">
                            {t('contact.email')} {t('contact.required')}
                          </label>
                          <input
                            type="email"
                            required
                            value={config.contact.email}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              contact: { ...prev.contact, email: e.target.value }
                            }))}
                            className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:ring-2 focus:ring-dark-900/20 focus:border-dark-900 transition-all"
                            placeholder={t('contact.emailPlaceholder')}
                          />
                        </div>
                        <div>
                          <label className="block text-dark-700 text-sm font-medium mb-2">
                            {t('contact.phone')} {t('contact.required')}
                          </label>
                          <input
                            type="tel"
                            required
                            value={config.contact.phone}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              contact: { ...prev.contact, phone: e.target.value }
                            }))}
                            className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:ring-2 focus:ring-dark-900/20 focus:border-dark-900 transition-all"
                            placeholder={t('contact.phonePlaceholder')}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-dark-700 text-sm font-medium mb-2">
                          {t('contact.message')}
                        </label>
                        <textarea
                          rows={3}
                          value={config.contact.message}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            contact: { ...prev.contact, message: e.target.value }
                          }))}
                          className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:ring-2 focus:ring-dark-900/20 focus:border-dark-900 transition-all resize-none"
                          placeholder={t('contact.messagePlaceholder')}
                        />
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-sand-200 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] z-50">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
                    step === 1
                      ? 'text-dark-300 cursor-not-allowed'
                      : 'text-dark-900 bg-sand-100 hover:bg-sand-200'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="text-center">
                  <p className="text-2xl font-bold text-dark-900">CHF {getPrice()}.-</p>
                </div>

                {step < 4 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                      canProceed()
                        ? 'bg-dark-900 hover:bg-dark-800 text-white'
                        : 'bg-sand-200 text-dark-400 cursor-not-allowed'
                    }`}
                  >
                    {t('buttons.next')}
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                      canProceed()
                        ? 'bg-dark-900 hover:bg-dark-800 text-white'
                        : 'bg-sand-200 text-dark-400 cursor-not-allowed'
                    }`}
                  >
                    {t('buttons.send')}
                    <Send className="w-5 h-5 ml-1" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Summary (Desktop only) */}
          <div className="hidden lg:block w-[35%] bg-sand-700 text-white sticky top-[156px] h-[calc(100vh-156px)] overflow-hidden">
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-display font-bold">{t('summary.title')}</h2>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Vehicle */}
                <div className={`p-4 rounded-xl transition-all ${selectedVehicle ? 'bg-white/10' : 'bg-white/5 border border-dashed border-white/20'}`}>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-2">{t('summary.vehicle')}</p>
                  {selectedVehicle ? (
                    <div className="flex items-center gap-3">
                      <selectedVehicle.Icon className="w-6 h-6" />
                      <div>
                        <p className="font-semibold">{t(`vehicles.${selectedVehicle.id}.name`)}</p>
                        <p className="text-white/60 text-sm">{t(`vehicles.${selectedVehicle.id}.subtitle`)}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/40 text-sm">{t('summary.notSelected')}</p>
                  )}
                </div>

                {/* Pack */}
                <div className={`p-4 rounded-xl transition-all ${selectedPack ? 'bg-white/10' : 'bg-white/5 border border-dashed border-white/20'}`}>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-2">{t('summary.pack')}</p>
                  {selectedPack ? (
                    <div>
                      <p className="font-semibold">{t(`packs.${selectedPack.id}.name`)}</p>
                      <p className="text-white/60 text-sm">{selectedPack.duration}</p>
                    </div>
                  ) : (
                    <p className="text-white/40 text-sm">{t('summary.notSelected')}</p>
                  )}
                </div>

                {/* Options */}
                {config.options.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/10">
                    <p className="text-white/60 text-xs uppercase tracking-wider mb-2">{t('summary.options')}</p>
                    <div className="space-y-2">
                      {config.options.map(optId => {
                        const opt = additionalOptions.find(o => o.id === optId)
                        return (
                          <div key={optId} className="flex items-center justify-between text-sm">
                            <span>{t(`options.${optId}`)}</span>
                            <span className="text-white/60">+CHF {opt?.price}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Total & CTA */}
              <div className="pt-6 border-t border-white/20 mt-6">
                <div className="flex items-end justify-between mb-6">
                  <span className="text-white/60">{t('summary.total')}</span>
                  <div className="text-right">
                    <p className="text-4xl font-bold">CHF {getPrice()}.-</p>
                    {selectedPack && (
                      <p className="text-white/40 text-sm">{t('summary.duration')}: {selectedPack.duration}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  {step > 1 && (
                    <button
                      onClick={prevStep}
                      className="flex-1 flex items-center justify-center px-4 py-4 rounded-xl font-medium bg-white/10 hover:bg-white/20 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      {t('buttons.back')}
                    </button>
                  )}

                  {step < 4 ? (
                    <button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className={`flex-1 flex items-center justify-center px-4 py-4 rounded-xl font-semibold transition-all ${
                        canProceed()
                          ? 'bg-white text-dark-900 hover:bg-sand-100'
                          : 'bg-white/20 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      {t('buttons.continue')}
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!canProceed()}
                      className={`flex-1 flex items-center justify-center px-4 py-4 rounded-xl font-semibold transition-all ${
                        canProceed()
                          ? 'bg-white text-dark-900 hover:bg-sand-100'
                          : 'bg-white/20 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {t('buttons.sendRequest')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfiguratorV2
