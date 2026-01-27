import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, ChevronLeft, Car, CarFront, Truck, Zap, Sparkles, Shield, Plus, Minus, Send, Lightbulb, Wrench, Droplets, Wind, Armchair, PaintBucket, CircleDot, Flame } from 'lucide-react'
import SEOHead from '../components/SEOHead'

const Configurator = () => {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    vehicleType: null,
    basePack: null,
    options: [],
    contact: { name: '', email: '', phone: '', message: '' }
  })

  const vehicleTypes = [
    { id: 'compact', name: 'Citadine / Compacte', description: 'Polo, Golf, A3, Classe A...', multiplier: 1, Icon: Car },
    { id: 'sedan', name: 'Berline / SUV', description: '3 Series, C-Class, Q5, GLC...', multiplier: 1.25, Icon: CarFront },
    { id: 'large', name: 'Grand SUV / Van', description: 'X5, GLE, Q7, Range Rover...', multiplier: 1.5, Icon: Truck },
    { id: 'supercar', name: 'Supercar / Prestige', description: 'Ferrari, Lamborghini, Porsche GT...', multiplier: 1.8, Icon: Zap },
  ]

  const basePacks = [
    {
      id: 'eclat',
      name: 'Éclat Initial',
      description: 'Nettoyage complet intérieur/extérieur',
      basePrice: 150,
      duration: '2-3h',
      features: ['Lavage extérieur', 'Aspiration intérieur', 'Nettoyage vitres', 'Lustrage rapide']
    },
    {
      id: 'prestige',
      name: 'Prestige',
      description: 'Notre formule la plus populaire',
      basePrice: 280,
      duration: '4-5h',
      popular: true,
      features: ['Pack Éclat Initial', 'Décontamination clay', 'Shampooing sièges', 'Cire protection 3 mois']
    },
    {
      id: 'excellence',
      name: 'Excellence',
      description: 'Le summum du detailing',
      basePrice: 450,
      duration: '6-8h',
      features: ['Pack Prestige', 'Polish léger', 'Céramique express', 'Traitement complet']
    },
    {
      id: 'ceramique',
      name: 'Céramique Pro',
      description: 'Protection longue durée 3-5 ans',
      basePrice: 800,
      duration: '2 jours',
      features: ['Préparation complète', 'Polish correctif', 'Céramique 9H', 'Garantie 5 ans']
    }
  ]

  const additionalOptions = [
    { id: 'headlights', name: 'Rénovation phares', price: 80, Icon: Lightbulb },
    { id: 'engine', name: 'Nettoyage moteur', price: 60, Icon: Wrench },
    { id: 'rainrepel', name: 'Traitement anti-pluie vitres', price: 50, Icon: Droplets },
    { id: 'ozone', name: 'Désinfection ozone', price: 40, Icon: Wind },
    { id: 'leather', name: 'Traitement cuir complet', price: 120, Icon: Armchair },
    { id: 'plastics', name: 'Rénovation plastiques ext.', price: 50, Icon: PaintBucket },
    { id: 'wheels', name: 'Polish jantes céramique', price: 80, Icon: CircleDot },
    { id: 'exhaust', name: 'Polissage échappement', price: 40, Icon: Flame },
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
    // TODO: Send to API
    alert('Demande envoyée ! Nous vous recontacterons rapidement.')
  }

  return (
    <>
      <SEOHead page="configurator" />

      {/* Progress Bar - sticky avec titre intégré */}
      <section className="pt-6 pb-4 bg-white sticky top-[72px] z-40 border-b border-sand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-dark-900 mb-6 text-center">
            Configurez votre service
          </h1>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-between max-w-xl w-full">
              {['Véhicule', 'Pack', 'Options', 'Contact'].map((label, index) => (
                <div key={label} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                    step > index + 1
                      ? 'bg-dark-900 text-white'
                      : step === index + 1
                        ? 'bg-dark-900 text-white'
                        : 'bg-white text-dark-400 border border-sand-300'
                  }`}>
                    {step > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={`ml-2 text-sm hidden sm:block ${
                    step >= index + 1 ? 'text-dark-900' : 'text-dark-400'
                  }`}>
                    {label}
                  </span>
                  {index < 3 && (
                    <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-3 ${
                      step > index + 1 ? 'bg-dark-900' : 'bg-sand-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for sticky header */}
      <div className="h-[80px]" />

      {/* Configurator Content */}
      <section className="pb-40 bg-white min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Vehicle Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-dark-900 mb-8 text-center">
                  Quel est votre type de véhicule ?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vehicleTypes.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      onClick={() => setConfig(prev => ({ ...prev, vehicleType: vehicle.id }))}
                      className={`p-6 rounded-3xl border text-left transition-all ${
                        config.vehicleType === vehicle.id
                          ? 'bg-sand-200 border-dark-900'
                          : 'bg-white border-sand-200 hover:border-dark-300'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-dark-900 flex items-center justify-center mb-4">
                        <vehicle.Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-dark-900 mb-2">{vehicle.name}</h3>
                      <p className="text-dark-500 text-sm">{vehicle.description}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Base Pack */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-dark-900 mb-8 text-center">
                  Choisissez votre pack de base
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {basePacks.map((pack) => {
                    const vehicle = vehicleTypes.find(v => v.id === config.vehicleType)
                    const price = Math.round(pack.basePrice * (vehicle?.multiplier || 1))
                    return (
                      <button
                        key={pack.id}
                        onClick={() => setConfig(prev => ({ ...prev, basePack: pack.id }))}
                        className={`p-6 rounded-3xl border text-left transition-all relative ${
                          config.basePack === pack.id
                            ? 'bg-sand-200 border-dark-900'
                            : 'bg-white border-sand-200 hover:border-dark-300'
                        }`}
                      >
                        {pack.popular && (
                          <span className="absolute top-4 right-4 px-2 py-1 bg-dark-900 text-white text-xs font-semibold rounded-full">
                            Populaire
                          </span>
                        )}
                        <h3 className="text-xl font-semibold text-dark-900 mb-2">{pack.name}</h3>
                        <p className="text-dark-500 text-sm mb-4">{pack.description}</p>
                        <div className="text-3xl font-bold text-dark-900 mb-4">
                          CHF {price}.-
                        </div>
                        <ul className="space-y-2">
                          {pack.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-dark-600">
                              <Check className="w-4 h-4 text-dark-900 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Additional Options */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-dark-900 mb-8 text-center">
                  Ajoutez des options (facultatif)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {additionalOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                        config.options.includes(option.id)
                          ? 'bg-sand-200 border-dark-900'
                          : 'bg-white border-sand-200 hover:border-dark-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-dark-900 flex items-center justify-center mr-4">
                          <option.Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-dark-900 font-medium">{option.name}</h3>
                          <p className="text-dark-500 text-sm font-semibold">+CHF {option.price}.-</p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        config.options.includes(option.id)
                          ? 'bg-dark-900 border-dark-900'
                          : 'border-sand-400'
                      }`}>
                        {config.options.includes(option.id) && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Info */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-dark-900 mb-8 text-center">
                  Vos coordonnées
                </h2>
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={config.contact.name}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        contact: { ...prev.contact, name: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:border-dark-900 transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={config.contact.email}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        contact: { ...prev.contact, email: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:border-dark-900 transition-colors"
                      placeholder="jean@exemple.ch"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      value={config.contact.phone}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        contact: { ...prev.contact, phone: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:border-dark-900 transition-colors"
                      placeholder="+41 79 123 45 67"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">Message (optionnel)</label>
                    <textarea
                      rows={4}
                      value={config.contact.message}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        contact: { ...prev.contact, message: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:border-dark-900 transition-colors resize-none"
                      placeholder="Précisions sur votre véhicule, disponibilités..."
                    />
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom Bar with Price & Navigation */}
      <section className="py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-sm border-t border-sand-300 fixed bottom-0 left-0 right-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                step === 1
                  ? 'text-dark-300 cursor-not-allowed'
                  : 'text-dark-900 hover:bg-sand-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Retour
            </button>

            <div className="text-center">
              <div className="text-dark-500 text-sm">Total estimé</div>
              <div className="text-3xl font-bold text-dark-900">
                CHF {getPrice()}.-
              </div>
            </div>

            {step < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all ${
                  canProceed()
                    ? 'bg-dark-900 hover:bg-dark-800 text-white'
                    : 'bg-sand-300 text-dark-400 cursor-not-allowed'
                }`}
              >
                Suivant
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all ${
                  canProceed()
                    ? 'bg-dark-900 hover:bg-dark-800 text-white'
                    : 'bg-sand-300 text-dark-400 cursor-not-allowed'
                }`}
              >
                Envoyer
                <Send className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Configurator
