import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Package, MapPin, LogOut, Edit2, Save, X, AlertCircle, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import SEOHead from '../components/SEOHead'

const Account = () => {
  const { lang } = useParams()
  const { t } = useTranslation('auth')
  const { customer, isAuthenticated, loading, logout, updateProfile } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  })

  // Helper for localized paths
  const localePath = (path) => `/${lang}${path}`

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(localePath('/connexion'), { state: { from: { pathname: localePath('/compte') } } })
    }
  }, [loading, isAuthenticated, navigate, lang])

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        phone: customer.phone || ''
      })
    }
  }, [customer])

  const handleLogout = () => {
    logout()
    navigate(localePath('/'))
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      await updateProfile(formData)
      setSuccess(t('account.profile.success'))
      setIsEditing(false)
    } catch (err) {
      setError(err.message || t('errors.updateError'))
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'profile', label: t('account.tabs.profile'), icon: User },
    { id: 'orders', label: t('account.tabs.orders'), icon: Package },
    { id: 'addresses', label: t('account.tabs.addresses'), icon: MapPin }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-28 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-dark-900 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <SEOHead page="account" />

      <div className="min-h-screen bg-gradient-to-b from-sand-100 to-white pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-dark-900 mb-2">
              {t('account.title')}
            </h1>
            <p className="text-dark-500">
              {t('account.welcome')}, {customer?.firstName || 'Client'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden">
                <nav className="p-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-dark-900 text-white'
                          : 'text-dark-600 hover:bg-sand-100'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="border-t border-sand-200 p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">{t('account.logout')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-sand-200 p-6 sm:p-8"
              >
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-display font-bold text-dark-900">
                        {t('account.profile.title')}
                      </h2>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2 px-4 py-2 text-dark-600 hover:text-dark-900 hover:bg-sand-100 rounded-lg transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                          {t('account.profile.edit')}
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setIsEditing(false)
                              setFormData({
                                firstName: customer?.firstName || '',
                                lastName: customer?.lastName || '',
                                phone: customer?.phone || ''
                              })
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-dark-600 hover:text-dark-900 hover:bg-sand-100 rounded-lg transition-all"
                          >
                            <X className="w-4 h-4" />
                            {t('account.profile.cancel')}
                          </button>
                          <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-dark-900 text-white rounded-lg hover:bg-dark-800 transition-all disabled:opacity-50"
                          >
                            {saving ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            {t('account.profile.save')}
                          </button>
                        </div>
                      )}
                    </div>

                    {error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}

                    {success && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-green-700 text-sm">{success}</p>
                      </div>
                    )}

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-dark-700 mb-2">
                            {t('account.profile.firstName')}
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                              className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                            />
                          ) : (
                            <p className="text-dark-900 py-3">{customer?.firstName || '-'}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-dark-700 mb-2">
                            {t('account.profile.lastName')}
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                              className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                            />
                          ) : (
                            <p className="text-dark-900 py-3">{customer?.lastName || '-'}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">
                          {t('account.profile.email')}
                        </label>
                        <p className="text-dark-900 py-3">{customer?.email}</p>
                        <p className="text-dark-400 text-sm">{t('account.profile.emailNote')}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">
                          {t('account.profile.phone')}
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                            placeholder={t('account.profile.phonePlaceholder')}
                          />
                        ) : (
                          <p className="text-dark-900 py-3">{customer?.phone || '-'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-xl font-display font-bold text-dark-900 mb-6">
                      {t('account.orders.title')}
                    </h2>

                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-dark-300 mx-auto mb-4" />
                      <p className="text-dark-500 mb-4">{t('account.orders.noOrders')}</p>
                      <Link
                        to={localePath('/boutique')}
                        className="inline-flex items-center px-6 py-3 bg-dark-900 text-white font-semibold rounded-full hover:bg-dark-800 transition-all"
                      >
                        {t('account.orders.discoverShop')}
                      </Link>
                    </div>
                  </div>
                )}

                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <div>
                    <h2 className="text-xl font-display font-bold text-dark-900 mb-6">
                      {t('account.addresses.title')}
                    </h2>

                    <div className="text-center py-12">
                      <MapPin className="w-16 h-16 text-dark-300 mx-auto mb-4" />
                      <p className="text-dark-500 mb-4">{t('account.addresses.noAddresses')}</p>
                      <p className="text-dark-400 text-sm">
                        {t('account.addresses.noAddressesNote')}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account
