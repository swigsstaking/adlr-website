import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ChevronRight, Sparkles, Shield, Droplets, Car, Wrench, Star } from 'lucide-react'
import SEOHead from '../components/SEOHead'

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tous', icon: Car },
    { id: 'nettoyage', name: 'Nettoyage', icon: Droplets },
    { id: 'protection', name: 'Protection', icon: Shield },
    { id: 'correction', name: 'Correction', icon: Sparkles },
  ]

  const packs = [
    {
      id: 1,
      name: 'Éclat Initial',
      category: 'nettoyage',
      description: 'Nettoyage complet pour redonner de l\'éclat à votre véhicule',
      price: { small: 150, medium: 180, large: 220 },
      duration: '2-3h',
      popular: false,
      features: [
        'Lavage extérieur haute pression',
        'Nettoyage des jantes et pneus',
        'Shampooing carrosserie',
        'Séchage et lustrage rapide',
        'Nettoyage des vitres',
        'Aspiration intérieur complet',
        'Nettoyage des plastiques intérieurs',
      ]
    },
    {
      id: 2,
      name: 'Prestige',
      category: 'nettoyage',
      description: 'Notre pack le plus demandé pour un résultat impeccable',
      price: { small: 280, medium: 350, large: 420 },
      duration: '4-5h',
      popular: true,
      features: [
        'Tout le pack Éclat Initial',
        'Décontamination à la clay bar',
        'Nettoyage des joints et interstices',
        'Shampooing sièges et moquettes',
        'Traitement cuir (si applicable)',
        'Nettoyage compartiment moteur',
        'Cire de protection 3 mois',
        'Parfum intérieur premium',
      ]
    },
    {
      id: 3,
      name: 'Excellence',
      category: 'nettoyage',
      description: 'Le summum du detailing pour les perfectionnistes',
      price: { small: 450, medium: 550, large: 680 },
      duration: '6-8h',
      popular: false,
      features: [
        'Tout le pack Prestige',
        'Polish léger 1 passe',
        'Traitement anti-pluie vitres',
        'Rénovation plastiques extérieurs',
        'Traitement anti-UV plastiques',
        'Protection céramique express (6 mois)',
        'Certification détaillée',
      ]
    },
    {
      id: 4,
      name: 'Polish Correctif',
      category: 'correction',
      description: 'Correction des défauts de peinture pour une brillance parfaite',
      price: { small: 400, medium: 500, large: 650 },
      duration: '1 jour',
      popular: false,
      features: [
        'Analyse de l\'état de la peinture',
        'Décontamination complète',
        'Polish correctif 2-3 passes',
        'Élimination micro-rayures',
        'Suppression des swirls',
        'Correction hologrammes',
        'Finition haute brillance',
        'Protection cire 3 mois incluse',
      ]
    },
    {
      id: 5,
      name: 'Céramique Pro',
      category: 'protection',
      description: 'Protection céramique professionnelle longue durée',
      price: { small: 800, medium: 1000, large: 1300 },
      duration: '2 jours',
      popular: true,
      features: [
        'Préparation complète (pack Excellence)',
        'Polish correctif si nécessaire',
        'Dégraissage IPA',
        'Application céramique 9H',
        'Protection 3-5 ans',
        'Effet hydrophobe extrême',
        'Résistance UV et chimique',
        'Certificat d\'authenticité',
        'Kit entretien offert',
      ]
    },
    {
      id: 6,
      name: 'PPF Premium',
      category: 'protection',
      description: 'Film de protection carrosserie invisible',
      price: { small: 'Sur devis', medium: 'Sur devis', large: 'Sur devis' },
      duration: '2-4 jours',
      popular: false,
      features: [
        'Consultation personnalisée',
        'Film PPF haute qualité',
        'Protection pare-chocs avant',
        'Protection capot',
        'Protection ailes avant',
        'Protection rétroviseurs',
        'Garantie 10 ans',
        'Auto-cicatrisant',
      ]
    }
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
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">Nos prestations</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mt-3 mb-6">
              Services de Detailing<span className="text-primary-500">.</span>
            </h1>
            <p className="text-lg text-dark-500">
              Des packs adaptés à tous les besoins, du nettoyage simple à la protection haut de gamme.
            </p>
          </motion.div>

          {/* Quick links to service pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {[
              { name: 'Lavage', path: '/services/lavage' },
              { name: 'Polish', path: '/services/polish' },
              { name: 'Céramique', path: '/services/ceramique' },
              { name: 'Cire', path: '/services/cire' },
            ].map((service) => (
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
            {filteredPacks.map((pack, index) => (
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
                      Populaire
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-dark-900 mb-2">{pack.name}</h3>
                    <p className="text-dark-500 text-sm">{pack.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-4xl font-bold text-dark-900 mb-1">
                      {typeof pack.price.small === 'number' ? (
                        <>CHF {pack.price.small}.-</>
                      ) : (
                        <span className="text-2xl">{pack.price.small}</span>
                      )}
                    </div>
                    {typeof pack.price.small === 'number' && (
                      <p className="text-dark-400 text-sm">
                        Berline / SUV: CHF {pack.price.medium}.- | Grand: CHF {pack.price.large}.-
                      </p>
                    )}
                  </div>

                  <div className="flex items-center text-dark-500 text-sm mb-6">
                    <Wrench className="w-4 h-4 mr-2" />
                    Durée: {pack.duration}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pack.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className="w-5 h-5 text-dark-900 mr-3 flex-shrink-0" />
                        <span className="text-dark-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/configurateur"
                    className={`w-full flex items-center justify-center py-3 rounded-full font-semibold transition-all ${
                      pack.popular
                        ? 'bg-dark-900 hover:bg-dark-800 text-white'
                        : 'bg-white hover:bg-sand-100 text-dark-900 border-2 border-dark-900'
                    }`}
                  >
                    Réserver
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
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
              Services à la Carte
            </h2>
            <p className="text-dark-500">
              Personnalisez votre prestation avec nos options supplémentaires
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Rénovation phares', price: 80 },
              { name: 'Nettoyage moteur', price: 60 },
              { name: 'Traitement anti-pluie', price: 50 },
              { name: 'Désinfection ozone', price: 40 },
              { name: 'Nettoyage toit ouvrant', price: 30 },
              { name: 'Traitement cuir complet', price: 120 },
              { name: 'Rénovation plastiques', price: 50 },
              { name: 'Polish jantes', price: 80 },
            ].map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-sand-200"
              >
                <span className="text-dark-700">{service.name}</span>
                <span className="text-dark-900 font-semibold">CHF {service.price}.-</span>
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
              Besoin d'un devis personnalisé ?
            </h2>
            <p className="text-dark-500 mb-8 max-w-2xl mx-auto">
              Utilisez notre configurateur pour composer votre prestation sur mesure ou contactez-nous directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/configurateur"
                className="inline-flex items-center justify-center px-8 py-4 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-full transition-all"
              >
                Configurer mon service
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-sand-100 text-dark-900 font-semibold rounded-full border-2 border-dark-900 transition-all"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Services
