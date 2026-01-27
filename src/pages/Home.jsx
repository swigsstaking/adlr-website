import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Sparkles, Shield, Award, Clock, Star, ArrowRight } from 'lucide-react'
import SEOHead from '../components/SEOHead'

const Home = () => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const services = [
    {
      title: 'Lavage',
      description: 'Découvrez notre service de lavage automobile: un nettoyage minutieux, des produits haut de gamme, et une attention aux moindres détails.',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&auto=format&fit=crop'
    },
    {
      title: 'Polish',
      description: 'Offrez à votre voiture un éclat incomparable avec notre service de polish. Nous utilisons des techniques expertes pour redonner à votre véhicule sa brillance d\'origine.',
      image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&auto=format&fit=crop'
    },
    {
      title: 'Céramique',
      description: 'Protégez votre carrosserie avec notre traitement céramique professionnel. Une protection longue durée contre les agressions extérieures.',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop'
    },
    {
      title: 'Cire',
      description: 'Sublimez votre véhicule avec notre application de cire premium. Un résultat brillant et une protection naturelle pour votre peinture.',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop'
    }
  ]

  const testimonials = [
    {
      name: 'Marc D.',
      car: 'Porsche 911',
      text: 'Un travail exceptionnel sur ma 911. La céramique est parfaite, la voiture brille comme jamais.',
      rating: 5
    },
    {
      name: 'Sophie L.',
      car: 'BMW M4',
      text: 'Je recommande à 100%. Professionnalisme, conseils pertinents et résultat bluffant.',
      rating: 5
    },
    {
      name: 'Thomas R.',
      car: 'Mercedes AMG GT',
      text: 'Le polish correctif a fait des miracles sur ma peinture. Les micro-rayures ont disparu.',
      rating: 5
    }
  ]

  return (
    <>
      <SEOHead page="home" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center bg-white pt-20">
        {/* Beige Overlay Container */}
        <div className="absolute inset-x-6 top-24 bottom-6 bg-sand-300/40 rounded-3xl overflow-hidden">
          <motion.div
            style={{ y }}
            className="absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1920&auto=format&fit=crop"
              alt="Auto detailing"
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Light overlay for text readability */}
          <div className="absolute inset-0 bg-sand-300/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-dark-900 mb-8 leading-tight">
              Redécouvrez votre véhicule avec nous!
            </h1>
            <p className="text-lg md:text-xl text-dark-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              ADLR Cosmetic Auto - L'art du detailing automobile à votre service
            </p>
            <Link
              to="/services"
              className="inline-flex items-center justify-center w-40 h-40 rounded-full border-2 border-dark-900 text-dark-900 font-semibold text-sm uppercase tracking-wider hover:bg-dark-900 hover:text-white transition-all duration-300"
            >
              <span className="text-center leading-tight">
                Découvrir nos<br />services
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((service, index) => (
        <section key={service.title} className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-6">
                  {service.title}
                </h2>
                <p className="text-lg text-dark-500 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-dark-900 text-dark-900 font-semibold text-sm uppercase tracking-wider hover:bg-dark-900 hover:text-white transition-all duration-300"
                >
                  Découvrir nos services
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Stats Section */}
      <section className="py-24 bg-sand-300/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-6">
              Notre engagement qualité
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Véhicules traités' },
              { value: '5', label: 'Années d\'expérience' },
              { value: '100%', label: 'Satisfaction client' },
              { value: '24h', label: 'Délai moyen' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-dark-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-dark-500 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-6">
              Ce que disent nos clients
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-cream-300 rounded-3xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-dark-900 text-dark-900" />
                  ))}
                </div>
                <p className="text-dark-700 mb-6 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-dark-900">{testimonial.name}</div>
                  <div className="text-dark-400 text-sm">{testimonial.car}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-sand-300/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-6">
              Prêt à transformer votre véhicule ?
            </h2>
            <p className="text-lg text-dark-500 mb-10 max-w-2xl mx-auto">
              Obtenez un devis gratuit en quelques clics avec notre configurateur de services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/configurateur"
                className="inline-flex items-center justify-center px-8 py-4 bg-dark-900 text-white font-semibold rounded-full hover:bg-dark-800 transition-all duration-300"
              >
                Configurer mon service
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-dark-900 text-dark-900 font-semibold hover:bg-dark-900 hover:text-white transition-all duration-300"
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

export default Home
