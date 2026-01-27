import { createContext, useContext, useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || 'adlr'
const STORAGE_KEY = `${SITE_SLUG}_customer`
const TOKEN_KEY = `${SITE_SLUG}_token`

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [siteId, setSiteId] = useState(null)

  // Load customer and token from localStorage on mount
  useEffect(() => {
    const storedCustomer = localStorage.getItem(STORAGE_KEY)
    const storedToken = localStorage.getItem(TOKEN_KEY)

    if (storedCustomer && storedToken) {
      try {
        setCustomer(JSON.parse(storedCustomer))
        setToken(storedToken)
      } catch (error) {
        console.error('Error parsing stored customer:', error)
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(TOKEN_KEY)
      }
    }
    setLoading(false)
  }, [])

  // Fetch site ID for API calls
  useEffect(() => {
    const fetchSiteId = async () => {
      try {
        const response = await fetch(`${API_URL}/public/sites/${SITE_SLUG}`)
        const data = await response.json()
        if (data.success && data.data?._id) {
          setSiteId(data.data._id)
        }
      } catch (error) {
        console.error('Error fetching site ID:', error)
      }
    }
    fetchSiteId()
  }, [])

  // Save to localStorage when customer/token changes
  useEffect(() => {
    if (customer && token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customer))
      localStorage.setItem(TOKEN_KEY, token)
    }
  }, [customer, token])

  const register = async ({ email, password, firstName, lastName, phone }) => {
    if (!siteId) throw new Error('Site not loaded')

    const response = await fetch(`${API_URL}/customers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        phone,
        siteId
      })
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message || 'Erreur lors de l\'inscription')
    }

    setCustomer(data.data)
    setToken(data.data.token)
    return data.data
  }

  const login = async ({ email, password }) => {
    if (!siteId) throw new Error('Site not loaded')

    const response = await fetch(`${API_URL}/customers/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        siteId
      })
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message || 'Email ou mot de passe incorrect')
    }

    setCustomer(data.data)
    setToken(data.data.token)
    return data.data
  }

  const loginWithGoogle = async (credential) => {
    if (!siteId) throw new Error('Site not loaded')

    const response = await fetch(`${API_URL}/customers/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        credential,
        siteId
      })
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message || 'Erreur lors de la connexion Google')
    }

    setCustomer(data.data)
    setToken(data.data.token)
    return data.data
  }

  const logout = () => {
    setCustomer(null)
    setToken(null)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(TOKEN_KEY)
  }

  const updateProfile = async ({ firstName, lastName, phone }) => {
    if (!token) throw new Error('Non authentifié')

    const response = await fetch(`${API_URL}/customers/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ firstName, lastName, phone })
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message || 'Erreur lors de la mise à jour')
    }

    setCustomer(prev => ({ ...prev, ...data.data }))
    return data.data
  }

  const addAddress = async (address) => {
    if (!token) throw new Error('Non authentifié')

    const response = await fetch(`${API_URL}/customers/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(address)
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message || 'Erreur lors de l\'ajout de l\'adresse')
    }

    return data.data
  }

  const value = {
    customer,
    token,
    siteId,
    loading,
    isAuthenticated: !!customer,
    register,
    login,
    loginWithGoogle,
    logout,
    updateProfile,
    addAddress
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
