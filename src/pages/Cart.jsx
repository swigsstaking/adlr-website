import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import SEOHead from '../components/SEOHead'

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount, clearCart } = useCart()

  const cartTotal = getCartTotal()
  const cartCount = getCartCount()

  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      if (typeof product.images[0] === 'string') {
        return product.images[0]
      }
      return product.images[0]?.url
    }
    return 'https://via.placeholder.com/200'
  }

  const getProductPrice = (product) => {
    if (product.price?.amount !== undefined) {
      return product.price.amount
    }
    return product.price || 0
  }

  if (cart.length === 0) {
    return (
      <>
        <SEOHead
          title="Panier | ADLR Cosmetic Auto"
          description="Votre panier est vide. Découvrez notre sélection de produits de detailing."
        />

        <div className="min-h-screen bg-gradient-to-b from-sand-100 to-white pt-28 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-sand-200 p-8 sm:p-12 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-sand-100 flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-dark-400" />
              </div>
              <h1 className="text-2xl font-display font-bold text-dark-900 mb-3">
                Votre panier est vide
              </h1>
              <p className="text-dark-500 mb-8">
                Découvrez notre sélection de produits de detailing professionnels
              </p>
              <Link
                to="/boutique"
                className="inline-flex items-center px-6 py-3 bg-dark-900 text-white font-semibold rounded-full hover:bg-dark-800 transition-all"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Voir la boutique
              </Link>
            </motion.div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEOHead
        title={`Panier (${cartCount}) | ADLR Cosmetic Auto`}
        description="Finalisez votre commande de produits de detailing."
      />

      <div className="min-h-screen bg-gradient-to-b from-sand-100 to-white pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-dark-900 mb-2">
                Votre panier
              </h1>
              <p className="text-dark-500">
                {cartCount} article{cartCount > 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Vider le panier
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-sand-200 p-4 sm:p-6"
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* Image */}
                    <Link to={`/boutique/${item._id}`} className="flex-shrink-0">
                      <img
                        src={getProductImage(item)}
                        alt={item.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl"
                      />
                    </Link>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/boutique/${item._id}`}>
                        <h3 className="font-semibold text-dark-900 hover:text-primary-600 transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      {item.category?.name && (
                        <p className="text-dark-400 text-sm mt-1">{item.category.name}</p>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border border-sand-300 flex items-center justify-center text-dark-600 hover:bg-sand-100 transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium text-dark-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-sand-300 flex items-center justify-center text-dark-600 hover:bg-sand-100 transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-dark-900">
                            CHF {(getProductPrice(item) * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="p-2 text-dark-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Continue Shopping */}
              <Link
                to="/boutique"
                className="flex items-center gap-2 text-dark-500 hover:text-dark-900 transition-colors py-4"
              >
                <ArrowLeft className="w-5 h-5" />
                Continuer mes achats
              </Link>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-sand-200 p-6 sticky top-28"
              >
                <h2 className="text-lg font-display font-bold text-dark-900 mb-6">
                  Récapitulatif
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-dark-600">
                    <span>Sous-total</span>
                    <span>CHF {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-dark-600">
                    <span>Livraison</span>
                    <span className="text-primary-600">Gratuite</span>
                  </div>
                </div>

                <div className="border-t border-sand-200 pt-4 mb-6">
                  <div className="flex justify-between text-dark-900">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold">CHF {cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-dark-400 text-sm mt-1">TVA incluse</p>
                </div>

                <Link
                  to="/checkout"
                  className="w-full py-3.5 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Passer la commande
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-sand-200">
                  <div className="flex items-center justify-center gap-4 text-dark-400 text-sm">
                    <span>Paiement sécurisé</span>
                    <span>|</span>
                    <span>Livraison rapide</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
