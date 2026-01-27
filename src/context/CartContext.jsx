import { createContext, useContext, useState, useEffect } from 'react'

const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || 'adlr'
const CART_KEY = `${SITE_SLUG}_cart`

const CartContext = createContext(null)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY)
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (error) {
        console.error('Error parsing stored cart:', error)
        localStorage.removeItem(CART_KEY)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item._id === product._id)

      if (existingItem) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...prev, { ...product, quantity }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }

    setCart(prev =>
      prev.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem(CART_KEY)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.price?.amount || item.price || 0
      return total + price * item.quantity
    }, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
