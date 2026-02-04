import { useState } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import { useGoogleOAuth } from '../hooks/useGoogleOAuth'
import SEOHead from '../components/SEOHead'

const LoginForm = () => {
  const { lang } = useParams()
  const { t } = useTranslation('auth')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, loginWithGoogle } = useAuth()
  const { googleConfig, isEnabled: isGoogleEnabled } = useGoogleOAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Helper for localized paths
  const localePath = (path) => `/${lang}${path}`

  const from = location.state?.from?.pathname || localePath('/compte')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || t('errors.loginError'))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('')
    setLoading(true)

    try {
      await loginWithGoogle(credentialResponse.credential)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || t('errors.googleLoginError'))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    setError(t('errors.googleLoginError'))
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-dark-900 mb-2">
          {t('login.title')}
        </h1>
        <p className="text-dark-500">
          {t('login.subtitle')}
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
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-2">
            {t('login.email')}
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
              placeholder={t('login.emailPlaceholder')}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-dark-700 mb-2">
            {t('login.password')}
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
              placeholder={t('login.passwordPlaceholder')}
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {t('login.submit')}
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
              <span className="px-4 bg-white text-dark-400">{t('login.orContinueWith')}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleOAuthProvider clientId={googleConfig.clientId}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="continue_with"
                shape="pill"
                locale={lang}
              />
            </GoogleOAuthProvider>
          </div>
        </>
      )}

      <p className="mt-8 text-center text-dark-500">
        {t('login.noAccount')}{' '}
        <Link to={localePath('/inscription')} className="text-dark-900 font-semibold hover:underline">
          {t('login.register')}
        </Link>
      </p>
    </div>
  )
}

const Login = () => {
  return (
    <>
      <SEOHead page="login" />

      <div className="min-h-screen bg-gradient-to-b from-sand-100 to-white pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-sand-200 p-8 sm:p-12"
          >
            <LoginForm />
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Login
