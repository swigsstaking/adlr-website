import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, AlertCircle, Check } from 'lucide-react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'
import { useGoogleOAuth } from '../hooks/useGoogleOAuth'
import SEOHead from '../components/SEOHead'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, loginWithGoogle } = useAuth()
  const { googleConfig, isEnabled: isGoogleEnabled } = useGoogleOAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setLoading(true)

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      })
      navigate('/compte')
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('')
    setLoading(true)

    try {
      await loginWithGoogle(credentialResponse.credential)
      navigate('/compte')
    } catch (err) {
      setError(err.message || 'Erreur de connexion Google')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    setError('Erreur lors de la connexion Google')
  }

  const benefits = [
    'Suivi de vos commandes en temps réel',
    'Historique de vos achats',
    'Accès aux offres exclusives',
    'Sauvegarde de vos adresses'
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Benefits */}
      <div className="hidden lg:block">
        <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
          Pourquoi créer un compte ?
        </h2>
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-600" />
              </div>
              <span className="text-dark-600">{benefit}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 p-6 bg-sand-100 rounded-2xl">
          <p className="text-dark-600 italic">
            "Je commande régulièrement mes produits de detailing chez ADLR. Le suivi de commande est super pratique !"
          </p>
          <p className="mt-4 text-dark-900 font-semibold">- Marc D., client fidèle</p>
        </div>
      </div>

      {/* Form */}
      <div>
        <div className="text-center lg:text-left mb-8">
          <h1 className="text-3xl font-display font-bold text-dark-900 mb-2">
            Créer un compte
          </h1>
          <p className="text-dark-500">
            Rejoignez la communauté ADLR
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-dark-700 mb-2">
                Prénom
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                  placeholder="Jean"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-dark-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                placeholder="Dupont"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                placeholder="votre@email.ch"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-dark-700 mb-2">
              Téléphone (optionnel)
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                placeholder="+41 XX XXX XX XX"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-dark-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                placeholder="Minimum 6 caractères"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-700 mb-2">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                placeholder="Confirmez votre mot de passe"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Créer mon compte
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {isGoogleEnabled && googleConfig?.clientId && (
          <>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-sand-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-dark-400">ou continuer avec</span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleOAuthProvider clientId={googleConfig.clientId}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  text="signup_with"
                  shape="pill"
                  locale="fr"
                />
              </GoogleOAuthProvider>
            </div>
          </>
        )}

        <p className="mt-8 text-center text-dark-500">
          Déjà un compte ?{' '}
          <Link to="/connexion" className="text-dark-900 font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}

const Register = () => {
  return (
    <>
      <SEOHead
        title="Créer un compte | ADLR Cosmetic Auto"
        description="Créez votre compte ADLR pour suivre vos commandes et accéder à des offres exclusives."
      />

      <div className="min-h-screen bg-gradient-to-b from-sand-100 to-white pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-sand-200 p-8 sm:p-12"
          >
            <RegisterForm />
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Register
