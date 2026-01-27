import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Package, MapPin, LogOut, Edit2, Save, X, AlertCircle, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import SEOHead from '../components/SEOHead'

const Account = () => {
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

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/connexion', { state: { from: { pathname: '/compte' } } })
    }
  }, [loading, isAuthenticated, navigate])

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
    navigate('/')
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      await updateProfile(formData)
      setSuccess('Profil mis à jour avec succès')
      setIsEditing(false)
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'orders', label: 'Mes commandes', icon: Package },
    { id: 'addresses', label: 'Mes adresses', icon: MapPin }
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
      <SEOHead
        title="Mon compte | ADLR Cosmetic Auto"
        description="Gérez votre compte ADLR, consultez vos commandes et modifiez vos informations."
      />

      <div className="min-h-screen bg-gradient-to-b from-sand-100 to-white pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-dark-900 mb-2">
              Mon compte
            </h1>
            <p className="text-dark-500">
              Bienvenue, {customer?.firstName || 'Client'}
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
                    <span className="font-medium">Déconnexion</span>
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
                        Informations personnelles
                      </h2>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2 px-4 py-2 text-dark-600 hover:text-dark-900 hover:bg-sand-100 rounded-lg transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                          Modifier
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
                            Annuler
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
                            Enregistrer
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
                            Prénom
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
                            Nom
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
                          Email
                        </label>
                        <p className="text-dark-900 py-3">{customer?.email}</p>
                        <p className="text-dark-400 text-sm">L'email ne peut pas être modifié</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">
                          Téléphone
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-4 py-3 border border-sand-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 transition-all"
                            placeholder="+41 XX XXX XX XX"
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
                      Mes commandes
                    </h2>

                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-dark-300 mx-auto mb-4" />
                      <p className="text-dark-500 mb-4">Vous n'avez pas encore de commandes</p>
                      <Link
                        to="/boutique"
                        className="inline-flex items-center px-6 py-3 bg-dark-900 text-white font-semibold rounded-full hover:bg-dark-800 transition-all"
                      >
                        Découvrir la boutique
                      </Link>
                    </div>
                  </div>
                )}

                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <div>
                    <h2 className="text-xl font-display font-bold text-dark-900 mb-6">
                      Mes adresses
                    </h2>

                    <div className="text-center py-12">
                      <MapPin className="w-16 h-16 text-dark-300 mx-auto mb-4" />
                      <p className="text-dark-500 mb-4">Aucune adresse enregistrée</p>
                      <p className="text-dark-400 text-sm">
                        Vos adresses seront sauvegardées lors de votre première commande
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
