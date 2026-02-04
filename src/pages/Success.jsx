import { useEffect } from 'react'
import { Link, useSearchParams, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Mail, Truck, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import SEOHead from '../components/SEOHead'

const Success = () => {
  const { lang } = useParams()
  const { t } = useTranslation('cart')
  const { clearCart } = useCart()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  // Helper for localized paths
  const localePath = (path) => `/${lang}${path}`

  // Clear cart on successful payment
  useEffect(() => {
    clearCart()
  }, [clearCart])

  const steps = [
    {
      icon: Mail,
      title: t('success.steps.email.title'),
      description: t('success.steps.email.description')
    },
    {
      icon: Package,
      title: t('success.steps.preparation.title'),
      description: t('success.steps.preparation.description')
    },
    {
      icon: Truck,
      title: t('success.steps.delivery.title'),
      description: t('success.steps.delivery.description')
    }
  ]

  return (
    <>
      <SEOHead page="success" />

      <div className="min-h-screen bg-gradient-to-b from-sand-100 to-white pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-sand-200 p-8 sm:p-12"
          >
            {/* Success Icon */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-green-600" />
              </motion.div>

              <h1 className="text-3xl font-display font-bold text-dark-900 mb-3">
                {t('success.title')}
              </h1>
              <p className="text-dark-500 text-lg">
                {t('success.subtitle')}
              </p>

              {sessionId && (
                <p className="text-dark-400 text-sm mt-4">
                  {t('success.reference')}: {sessionId.slice(0, 20)}...
                </p>
              )}
            </div>

            {/* Next Steps */}
            <div className="mb-10">
              <h2 className="text-lg font-display font-bold text-dark-900 mb-6 text-center">
                {t('success.nextSteps')}
              </h2>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-sand-50 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-dark-900 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-900">{step.title}</h3>
                      <p className="text-dark-500 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={localePath('/boutique')}
                className="px-6 py-3 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2"
              >
                {t('success.continueShopping')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={localePath('/compte')}
                className="px-6 py-3 border-2 border-dark-900 text-dark-900 font-semibold rounded-full hover:bg-dark-900 hover:text-white transition-all flex items-center justify-center"
              >
                {t('success.viewAccount')}
              </Link>
            </div>

            {/* Support */}
            <div className="mt-10 pt-8 border-t border-sand-200 text-center">
              <p className="text-dark-500 text-sm">
                {t('success.support')}{' '}
                <a href="mailto:contact@adlrcosmeticauto.ch" className="text-dark-900 font-medium hover:underline">
                  contact@adlrcosmeticauto.ch
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Success
