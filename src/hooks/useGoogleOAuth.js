import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || 'adlr'

export const useGoogleOAuth = () => {
  const [googleConfig, setGoogleConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGoogleConfig = async () => {
      try {
        const response = await fetch(`${API_URL}/public/sites/${SITE_SLUG}`)
        const data = await response.json()

        if (data.success && data.data?.googleOAuthConfig) {
          setGoogleConfig(data.data.googleOAuthConfig)
        }
      } catch (error) {
        console.error('Error fetching Google OAuth config:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGoogleConfig()
  }, [])

  return {
    googleConfig,
    loading,
    isEnabled: googleConfig?.enabled && googleConfig?.clientId
  }
}
