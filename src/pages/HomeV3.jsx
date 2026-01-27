import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, ChevronDown, ArrowRight, Star } from 'lucide-react'
import SEOHead from '../components/SEOHead'

/**
 * HomeV3 - Design premium detailing
 * Style Porsche avec images parallax qui s'entrecroisent
 */
const HomeV3 = () => {
  const heroRef = useRef(null)

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const carX = useTransform(heroProgress, [0, 1], ['0%', '10%'])
  const textOpacity = useTransform(heroProgress, [0, 0.5], [1, 0])

  const stats = [
    { value: '500+', label: 'Véhicules traités' },
    { value: '98%', label: 'Clients satisfaits' },
    { value: '5+', label: 'Ans d\'expérience' }
  ]

  const testimonials = [
    {
      name: 'Marc D.',
      car: 'Porsche 911 GT3',
      text: 'Un travail exceptionnel. La céramique est parfaite, ma voiture n\'a jamais autant brillé.',
      rating: 5
    },
    {
      name: 'Sophie L.',
      car: 'BMW M4 Competition',
      text: 'Professionnalisme et résultat bluffant. Je recommande à 100%.',
      rating: 5
    },
    {
      name: 'Thomas R.',
      car: 'Mercedes AMG GT',
      text: 'Le polish correctif a fait des miracles. Les micro-rayures ont totalement disparu.',
      rating: 5
    }
  ]

  return (
    <>
      <SEOHead page="home" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen bg-[#f8f7f4] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sand-200/30 via-transparent to-sand-300/20" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen items-center">
            <motion.div
              style={{ opacity: textOpacity }}
              className="lg:col-span-5 pt-20 lg:pt-0 z-20"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="mb-8">
                  <h1 className="font-display font-black text-dark-900 leading-[0.9] tracking-tight">
                    <span className="text-5xl md:text-6xl lg:text-7xl block">ADLR</span>
                    <span className="text-3xl md:text-4xl lg:text-5xl block text-dark-500 font-bold mt-2">
                      Cosmetic Auto<span className="text-primary-500">.</span>
                    </span>
                  </h1>
                </div>

                <p className="text-dark-500 text-lg md:text-xl max-w-md mb-10 leading-relaxed">
                  L'excellence du detailing automobile.
                  Des prestations haut de gamme pour sublimer votre véhicule.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/configurateur"
                    className="inline-flex items-center px-8 py-4 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-full transition-all duration-300 group"
                  >
                    Obtenir un devis
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center px-8 py-4 border-2 border-dark-300 hover:border-dark-900 text-dark-700 hover:text-dark-900 font-semibold rounded-full transition-all duration-300"
                  >
                    Nos services
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: carX }}
              className="lg:col-span-7 relative flex items-center justify-center lg:justify-end"
            >
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-4xl"
              >
                <img
                  src="https://swigs.online/uploads/adlr/1769437285688-381899037.webp"
                  alt="Porsche detailing premium"
                  className="w-full h-auto object-contain relative z-10"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-gradient-to-t from-dark-900/15 to-transparent blur-xl rounded-full" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute bottom-[15%] left-[35%] w-4 h-4 bg-primary-500 rounded-full shadow-lg shadow-primary-500/50"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-8 left-6 right-6 lg:left-12 lg:right-12"
          >
            <div className="flex items-end justify-between py-6 border-t border-dark-200/50">
              <div className="flex items-center gap-8 md:gap-16">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl md:text-4xl font-bold text-dark-900">{stat.value}</p>
                    <p className="text-xs md:text-sm text-dark-400 uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="hidden md:flex items-center gap-3 text-dark-400 hover:text-dark-900 transition-colors group"
              >
                <span className="text-sm">Scroll</span>
                <div className="w-10 h-10 rounded-full border border-dark-300 flex items-center justify-center group-hover:border-dark-900 transition-colors">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Parallax Crossover */}
      <ParallaxServices />

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">Témoignages</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-dark-900 mt-4">
              Clients satisfaits<span className="text-primary-500">.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-sand-50 rounded-3xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary-500 text-primary-500" />
                  ))}
                </div>
                <p className="text-dark-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="pt-4 border-t border-dark-200/50">
                  <p className="font-semibold text-dark-900">{testimonial.name}</p>
                  <p className="text-dark-400 text-sm">{testimonial.car}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-dark-900 relative overflow-hidden z-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white mb-6">
              Prêt à transformer<br />votre véhicule<span className="text-primary-500">?</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Obtenez un devis personnalisé en quelques clics avec notre configurateur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/configurateur"
                className="inline-flex items-center justify-center px-10 py-5 bg-white hover:bg-sand-100 text-dark-900 font-bold rounded-full transition-all duration-300 group"
              >
                Configurer mon service
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/30 hover:border-white text-white font-semibold rounded-full transition-all duration-300"
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

/**
 * ParallaxServices - Design avec images qui remontent et se chevauchent
 * Effet "stacked cards" élégant
 */
const ParallaxServices = () => {
  // Ordre des services: Lavage, Polish, Céramique, Autres, Cire
  const services = [
    {
      title: 'Lavage',
      subtitle: 'Premium.',
      description: 'Découvrez notre service de lavage automobile : un nettoyage minutieux intérieur et extérieur, des produits haut de gamme sélectionnés par nos experts.',
      video: 'https://video.wixstatic.com/video/bf2329_97a02c74491e4e3b933761a5354c1870/720p/mp4/file.mp4',
      link: '/services/lavage',
    },
    {
      title: 'Polish',
      subtitle: 'Correctif.',
      description: 'Offrez à votre voiture un éclat incomparable. Nous utilisons des techniques professionnelles pour éliminer micro-rayures, swirls et hologrammes.',
      video: 'https://video.wixstatic.com/video/bf2329_89210701a0a74d41854ab173902a0583/720p/mp4/file.mp4',
      link: '/services/polish',
    },
    {
      title: 'Protection',
      subtitle: 'Céramique.',
      description: 'Protégez votre investissement avec notre traitement céramique professionnel. Une barrière invisible haute performance contre les UV.',
      video: 'https://video.wixstatic.com/video/bf2329_89b93bd6dc05409fb7993b679512255e/720p/mp4/file.mp4',
      link: '/services/ceramique',
    },
    {
      title: 'Nos autres',
      subtitle: 'Services.',
      description: 'Nous proposons d\'autres services en fonction de vos besoins. N\'hésitez pas à nous contacter pour toutes vos questions.',
      video: 'https://video.wixstatic.com/video/bf2329_8df04913038947498d9e06c66273495a/720p/mp4/file.mp4',
      link: '/services',
    },
    {
      title: 'Cire',
      subtitle: 'Premium.',
      description: 'Sublimez votre véhicule avec notre application de cire premium. Un résultat brillant pour révéler toute la profondeur de votre peinture.',
      video: 'https://video.wixstatic.com/video/bf2329_5458ea175d88432caeed969df129eb8e/720p/mp4/file.mp4',
      link: '/services/cire',
      isLast: true,
    },
  ]

  return (
    <section className="relative bg-[#f8f7f4]">
      {services.map((service, index) => (
        <ServiceCard
          key={service.title}
          service={service}
          index={index}
          isLast={index === services.length - 1}
          totalCards={services.length}
        />
      ))}
    </section>
  )
}

/**
 * ServiceCard - Carte qui colle sous le header et se fait recouvrir par la suivante
 */
const ServiceCard = ({ service, index, isLast, totalCards }) => {
  const cardRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 80px", "end start"]
  })

  // L'image monte légèrement pendant le scroll
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -30])

  // Alternance gauche/droite
  const isEven = index % 2 === 0

  return (
    <div
      ref={cardRef}
      className={`${isLast ? 'relative' : 'sticky top-[72px]'} min-h-[calc(100vh-72px)] flex items-center`}
      style={{ zIndex: isLast ? totalCards + 10 : index + 1 }}
    >
      {/* Background avec couleur alternée subtile */}
      <div className={`absolute inset-0 ${index % 2 === 0 ? 'bg-[#f8f7f4]' : 'bg-white'}`} />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6 }}
            className={`${!isEven ? 'lg:order-2' : ''}`}
          >
            <div className="max-w-xl">
              <h2 className="font-display font-black text-dark-900 leading-[0.95] mb-6">
                <span className="block text-5xl md:text-6xl lg:text-7xl">{service.title}</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-dark-400">{service.subtitle}</span>
              </h2>
              <p className="text-dark-500 text-lg lg:text-xl leading-relaxed mb-8">
                {service.description}
              </p>
              <Link
                to={service.link || '/services'}
                className="inline-flex items-center px-8 py-4 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-full transition-all duration-300 group"
              >
                {service.isLast ? 'Découvrir nos services' : 'En savoir plus'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Video/Image */}
          <motion.div
            style={{ y: isLast ? 0 : imageY }}
            className={`relative ${!isEven ? 'lg:order-1' : ''}`}
          >
            <div className="relative">
              {/* Ombre sous le media */}
              <div className="absolute -bottom-4 left-4 right-4 h-16 bg-dark-900/10 blur-2xl rounded-full" />

              {/* Container media avec bordure arrondie - aspect ratio réduit */}
              <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-dark-900/20">
                {service.video ? (
                  <video
                    src={service.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Overlay gradient subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 via-transparent to-transparent" />
              </div>

              {/* Badge numéro */}
              <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full shadow-xl flex items-center justify-center">
                <span className="text-2xl lg:text-3xl font-display font-black text-dark-900">
                  0{index + 1}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ligne de séparation subtile en bas (sauf dernière) */}
      {!isLast && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-dark-200" />
      )}
    </div>
  )
}

export default HomeV3
