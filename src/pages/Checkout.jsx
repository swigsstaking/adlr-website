import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, AlertCircle, ChevronDown, Tag, X, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import SEOHead from '../components/SEOHead'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || 'adlr'

const Checkout = () => {
  const { lang } = useParams()
  const { t } = useTranslation('cart')
  const { cart, getCartTotal, clearCart } = useCart()
  const { customer, siteId } = useAuth()
  const navigate = useNavigate()

  // Helper for localized paths
  const localePath = (path) => `/${lang}${path}`

  const countries = [
    { code: 'CH', name: t('checkout.countries.CH') },
    { code: 'FR', name: t('checkout.countries.FR') },
    { code: 'DE', name: t('checkout.countries.DE') },
    { code: 'IT', name: t('checkout.countries.IT') },
    { code: 'AT', name: t('checkout.countries.AT') }
  ]

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'CH'
  })

  // Promo code state
  const [promoCode, setPromoCode] = useState('')
  const [promoLoading, setPromoLoading] = useState(false)
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState('')

  // Pre-fill from customer if logged in
  useEffect(() => {
    if (customer) {
      setFormData(prev => ({
        ...prev,
        email: customer.email || '',
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        phone: customer.phone || ''
      }))
    }
  }, [customer])

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate(localePath('/panier'))
    }
  }, [cart, navigate, lang])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const cartTotal = getCartTotal()

  // Calculate discount
  const calculateDiscount = () => {
    if (!appliedPromo) return 0

    if (appliedPromo.type === 'percentage') {
      let discount = (cartTotal * appliedPromo.value) / 100
      if (appliedPromo.maxDiscount) {
        discount = Math.min(discount, appliedPromo.maxDiscount)
      }
      return discount
    }

    return appliedPromo.value
  }

  const discount = calculateDiscount()
  const finalTotal = cartTotal - discount

  const getProductPrice = (product) => {
    if (product.price?.amount !== undefined) {
      return product.price.amount
    }
    return product.price || 0
  }

  const validatePromoCode = async () => {
    if (!promoCode.trim()) return

    setPromoLoading(true)
    setPromoError('')

    try {
      const response = await fetch(`${API_URL}/promo-codes/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: promoCode.toUpperCase(),
          orderTotal: cartTotal
        })
      })

      const data = await response.json()

      if (data.success) {
        setAppliedPromo(data.data)
        setPromoCode('')
      } else {
        setPromoError(data.message || t('checkout.promo.invalid'))
      }
    } catch (err) {
      setPromoError(t('checkout.promo.validationError'))
    } finally {
      setPromoLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Get siteId if not available from auth context
    let currentSiteId = siteId
    if (!currentSiteId) {
      try {
        const siteResponse = await fetch(`${API_URL}/public/sites/${SITE_SLUG}`)
        const siteData = await siteResponse.json()
        if (siteData.success && siteData.data?._id) {
          currentSiteId = siteData.data._id
        }
      } catch (err) {
        setError(t('checkout.errors.loadError'))
        setLoading(false)
        return
      }
    }

    if (!currentSiteId) {
      setError(t('checkout.errors.configError'))
      setLoading(false)
      return
    }

    try {
      const orderPayload = {
        siteId: currentSiteId,
        customer: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        },
        items: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity,
          variant: item.variant || null
        })),
        promoCode: appliedPromo?.code || undefined,
        shipping: {
          method: 'standard',
          cost: 0,
          address: {
            street: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country
          }
        },
        billing: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: {
            street: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country
          }
        }
      }

      const response = await fetch(`${API_URL}/orders/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      })

      const data = await response.json()

      if (data.success && data.data?.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = data.data.checkoutUrl
      } else {
        setError(data.message || t('checkout.errors.orderError'))
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(t('checkout.errors.paymentError'))
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return null
  }

  return (
    <>
      <SEOHead page="checkout" />

      <div className="min-h-screen bg-sand-50 pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              to={localePath('/panier')}
              className="inline-flex items-center gap-2 text-dark-500 hover:text-dark-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('checkout.backToCart')}
            </Link>
            <h1 className="text-3xl font-display font-bold text-dark-900">
              {t('checkout.title')}
            </h1>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-sand-200 p-6"
                >
                  <h2 className="text-lg font-display font-bold text-dark-900 mb-6">
                    {t('checkout.contactInfo.title')}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        {t('checkout.contactInfo.email')} {t('checkout.contactInfo.required')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">
                          {t('checkout.contactInfo.firstName')} {t('checkout.contactInfo.required')}
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">
                          {t('checkout.contactInfo.lastName')} {t('checkout.contactInfo.required')}
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        {t('checkout.contactInfo.phone')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                        placeholder={t('checkout.contactInfo.phonePlaceholder')}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Shipping Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl border border-sand-200 p-6"
                >
                  <h2 className="text-lg font-display font-bold text-dark-900 mb-6">
                    {t('checkout.shippingAddress.title')}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        {t('checkout.shippingAddress.address')} {t('checkout.contactInfo.required')}
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                        placeholder={t('checkout.shippingAddress.addressPlaceholder')}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">
                          {t('checkout.shippingAddress.postalCode')} {t('checkout.contactInfo.required')}
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">
                          {t('checkout.shippingAddress.city')} {t('checkout.contactInfo.required')}
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        {t('checkout.shippingAddress.country')} {t('checkout.contactInfo.required')}
                      </label>
                      <div className="relative">
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all appearance-none"
                          required
                        >
                          {countries.map(country => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Submit (mobile) */}
                <div className="lg:hidden">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        {t('checkout.payment.payAmount', { amount: finalTotal.toFixed(2) })}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-sand-200 p-6 sticky top-28"
              >
                <h2 className="text-lg font-display font-bold text-dark-900 mb-6">
                  {t('checkout.order.title')}
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item._id} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <img
                          src={item.images?.[0]?.url || item.images?.[0] || 'https://via.placeholder.com/100'}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-dark-900 text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-dark-900 font-medium text-sm line-clamp-2">{item.name}</p>
                        <p className="text-dark-500 text-sm">
                          CHF {(getProductPrice(item) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="mb-6 pb-6 border-b border-sand-200">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 font-medium">{appliedPromo.code}</span>
                      </div>
                      <button
                        onClick={() => setAppliedPromo(null)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder={t('checkout.promo.placeholder')}
                          className="flex-1 px-4 py-2 border border-sand-300 rounded-lg focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all text-sm"
                        />
                        <button
                          type="button"
                          onClick={validatePromoCode}
                          disabled={promoLoading || !promoCode.trim()}
                          className="px-4 py-2 bg-dark-900 text-white rounded-lg hover:bg-dark-800 transition-all text-sm disabled:opacity-50"
                        >
                          {promoLoading ? '...' : t('checkout.promo.apply')}
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-red-500 text-sm mt-2">{promoError}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-dark-600">
                    <span>{t('checkout.order.subtotal')}</span>
                    <span>CHF {cartTotal.toFixed(2)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>{t('checkout.promo.discount')}</span>
                      <span>-CHF {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-dark-600">
                    <span>{t('checkout.order.shipping')}</span>
                    <span className="text-primary-600">{t('checkout.order.shippingFree')}</span>
                  </div>
                </div>

                <div className="border-t border-sand-200 pt-4 mb-6">
                  <div className="flex justify-between text-dark-900">
                    <span className="font-semibold">{t('checkout.order.total')}</span>
                    <span className="text-xl font-bold">CHF {finalTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-dark-400 text-sm mt-1">{t('checkout.order.vatIncluded')}</p>
                </div>

                {/* Submit (desktop) */}
                <button
                  type="submit"
                  form="checkout-form"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="hidden lg:flex w-full py-4 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-xl transition-all items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      {t('checkout.payment.payNow')}
                    </>
                  )}
                </button>

                {/* Trust */}
                <div className="mt-6 flex items-center justify-center gap-2 text-dark-400 text-sm">
                  <Lock className="w-4 h-4" />
                  <span>{t('checkout.payment.securedBy')}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
