import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Phone, Star, ArrowRight, Play } from 'lucide-react'
import SEOHead from '../components/SEOHead'

/**
 * HomeV2 - Inspiré du template Olprem (Luxury Car Rental)
 * Design : Fond noir, accent rouge #ff3131, voiture à droite, typographie luxe
 */
const HomeV2 = () => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const services = [
    {
      id: 1,
      title: 'Nettoyage Premium',
      description: 'Nettoyage complet intérieur et extérieur avec des produits professionnels.',
      price: 'Dès CHF 150.-',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Polish Correctif',
      description: 'Correction des défauts de peinture : micro-rayures, swirls, hologrammes.',
      price: 'Dès CHF 400.-',
      image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Protection Céramique',
      description: 'Traitement céramique longue durée pour une protection optimale.',
      price: 'Dès CHF 800.-',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop'
    }
  ]

  const stats = [
    { value: '500+', label: 'Véhicules traités' },
    { value: '5+', label: 'Ans d\'expérience' },
    { value: '100%', label: 'Satisfaction' },
    { value: '48h', label: 'Délai moyen' }
  ]

  return (
    <>
      <SEOHead page="home" />

      {/* Hero Section - Olprem Style */}
      <section ref={heroRef} className="relative min-h-screen bg-dark-900 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-primary-500/5 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-primary-500" />
                <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">
                  Premium Detailing
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
                LUXURY
                <br />
                <span className="text-white/90">DETAILING</span>
                <br />
                <span className="text-primary-500">SERVICES</span>
              </h1>

              {/* Vehicle Info Card */}
              <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8 max-w-sm">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Service du moment</p>
                <h3 className="text-white font-semibold text-lg mb-1">Pack Céramique Premium</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-primary-500 text-2xl font-bold">CHF 899.-</span>
                  <span className="text-white/40 text-sm">/ complet</span>
                </div>
                <Link
                  to="/configurateur"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  RÉSERVER MAINTENANT
                </Link>
              </div>

              {/* Contact CTA */}
              <a
                href="tel:+41000000000"
                className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-primary-500 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Appelez-nous</p>
                  <p className="text-white font-semibold">+41 XX XXX XX XX</p>
                </div>
              </a>
            </motion.div>

            {/* Right - Car Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main car image */}
              <div className="relative">
                <img
                  src="https://swigs.online/uploads/adlr/1769437285688-381899037.webp"
                  alt="Detailing automobile premium"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
                {/* Glow effect */}
                <div className="absolute -inset-10 bg-primary-500/10 blur-3xl rounded-full -z-10" />
              </div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 left-4 bg-dark-800/80 backdrop-blur-sm border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">500+</p>
                    <p className="text-xs text-white/40">Clients satisfaits</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-500">5★</p>
                    <p className="text-xs text-white/40">Note Google</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-white/40">
            <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="w-5 h-5 rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Today's Specials - Carousel Style */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                NOS SERVICES
              </h2>
              <p className="text-white/60 mt-2">Découvrez nos prestations premium</p>
            </div>
            <Link
              to="/services"
              className="hidden md:flex items-center gap-2 text-primary-500 hover:text-primary-400 font-semibold transition-colors"
            >
              Voir tous les services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-dark-900 rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-500 font-bold">{service.price}</span>
                    <Link
                      to="/services"
                      className="text-white/60 hover:text-primary-500 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      Détails <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary-500 font-semibold"
            >
              Voir tous les services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&auto=format&fit=crop"
                  alt="Detailing en action"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Accent border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary-500 rounded-2xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-primary-500" />
                <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">
                  À propos de nous
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                L'EXCELLENCE DU
                <br />
                <span className="text-primary-500">DETAILING</span>
              </h2>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">
                Chez ADLR Cosmetic Auto, nous sommes passionnés par l'automobile et le detailing.
                Notre expertise nous permet de redonner à votre véhicule son éclat d'origine,
                voire mieux.
              </p>
              <p className="text-white/60 mb-8 leading-relaxed">
                Nous utilisons exclusivement des produits premium et des techniques professionnelles
                pour garantir un résultat impeccable. Chaque véhicule est traité avec le plus grand soin.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              PRÊT À TRANSFORMER
              <br />
              <span className="text-primary-500">VOTRE VÉHICULE ?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Obtenez un devis gratuit en quelques clics avec notre configurateur de services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/configurateur"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Configurer mon service
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all duration-300"
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

export default HomeV2
