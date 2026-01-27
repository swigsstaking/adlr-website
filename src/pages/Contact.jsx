import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { useSiteInfo } from '../hooks/useSiteInfo'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const Contact = () => {
  const { siteInfo } = useSiteInfo()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)

  const subjects = [
    'Demande de devis',
    'Question sur un service',
    'Prise de rendez-vous',
    'Réclamation',
    'Autre'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch(`${API_URL}/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          site: 'adlr'
        })
      })

      const data = await response.json()

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Message envoyé avec succès ! Nous vous répondrons rapidement.'
        })
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        throw new Error(data.message || 'Erreur lors de l\'envoi')
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.'
      })
    } finally {
      setSending(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <SEOHead page="contact" />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-dark-500">
              Une question, un devis ? Notre équipe vous répond rapidement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-dark-900 mb-6">
                  Informations de contact
                </h2>
                <p className="text-dark-500">
                  N'hésitez pas à nous contacter pour toute question. Nous sommes là pour vous aider.
                </p>
              </div>

              <div className="space-y-6">
                {siteInfo?.contact?.phone && (
                  <a
                    href={`tel:${siteInfo.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-start p-4 bg-sand-100 rounded-2xl border border-sand-200 hover:border-dark-300 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-dark-900 flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-dark-900 font-semibold mb-1">Téléphone</h3>
                      <p className="text-dark-500">{siteInfo.contact.phone}</p>
                    </div>
                  </a>
                )}

                {siteInfo?.contact?.email && (
                  <a
                    href={`mailto:${siteInfo.contact.email}`}
                    className="flex items-start p-4 bg-sand-100 rounded-2xl border border-sand-200 hover:border-dark-300 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-dark-900 flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-dark-900 font-semibold mb-1">Email</h3>
                      <p className="text-dark-500">{siteInfo.contact.email}</p>
                    </div>
                  </a>
                )}

                {siteInfo?.contact?.address && (
                  <div className="flex items-start p-4 bg-sand-100 rounded-2xl border border-sand-200">
                    <div className="w-12 h-12 rounded-xl bg-dark-900 flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-dark-900 font-semibold mb-1">Adresse</h3>
                      <p className="text-dark-500">
                        {siteInfo.contact.address}
                        {siteInfo.contact.postalCode && (
                          <><br />{siteInfo.contact.postalCode} {siteInfo.contact.city}</>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start p-4 bg-sand-100 rounded-2xl border border-sand-200">
                  <div className="w-12 h-12 rounded-xl bg-dark-900 flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-dark-900 font-semibold mb-1">Horaires</h3>
                    <p className="text-dark-500">
                      Lundi - Vendredi: 8h - 18h<br />
                      Samedi: 9h - 16h<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              {siteInfo?.contact?.whatsapp && (
                <a
                  href={`https://wa.me/${siteInfo.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Nous écrire sur WhatsApp
                </a>
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="bg-sand-100 rounded-3xl p-8 border border-sand-200">
                <h2 className="text-2xl font-bold text-dark-900 mb-6">
                  Envoyez-nous un message
                </h2>

                {status.message && (
                  <div className={`mb-6 p-4 rounded-xl flex items-start ${
                    status.type === 'success'
                      ? 'bg-green-100 border border-green-200 text-green-700'
                      : 'bg-red-100 border border-red-200 text-red-700'
                  }`}>
                    {status.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    {status.message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:border-dark-900 transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:border-dark-900 transition-colors"
                      placeholder="jean@exemple.ch"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:border-dark-900 transition-colors"
                      placeholder="+41 79 123 45 67"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">
                      Sujet *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:border-dark-900 transition-colors"
                    >
                      <option value="">Sélectionner un sujet</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-dark-700 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-dark-900 focus:outline-none focus:border-dark-900 transition-colors resize-none"
                    placeholder="Décrivez votre demande..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center px-8 py-4 bg-dark-900 hover:bg-dark-800 disabled:bg-dark-400 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all"
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-96 bg-sand-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-dark-400 mx-auto mb-4" />
            <p className="text-dark-500">Carte Google Maps</p>
            <p className="text-dark-400 text-sm">(À configurer avec l'adresse exacte)</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
