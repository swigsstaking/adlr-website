import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Search, Plus, Package, X, Minus, ArrowRight, Filter } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { useCart } from '../context/CartContext'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || 'adlr'

/**
 * ShopV2 - Design moderne avec sidebar et panier flottant
 */
const ShopV2 = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const { cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartCount, isCartOpen, setIsCartOpen } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const siteRes = await fetch(`${API_URL}/public/sites/${SITE_SLUG}`)
        const siteData = await siteRes.json()

        if (siteData.success && siteData.data?._id) {
          const siteId = siteData.data._id
          const [productsRes, categoriesRes] = await Promise.all([
            fetch(`${API_URL}/products/public?siteId=${siteId}`),
            fetch(`${API_URL}/categories/public?siteId=${siteId}`)
          ])

          const productsData = await productsRes.json()
          const categoriesData = await categoriesRes.json()

          if (productsData.success) setProducts(productsData.data || [])
          if (categoriesData.success) setCategories(categoriesData.data || [])
        }
      } catch (error) {
        console.error('Erreur chargement boutique:', error)
        setProducts(demoProducts)
        setCategories(demoCategories)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const demoCategories = [
    { _id: '1', name: 'Shampoings', slug: 'shampoings', count: 4 },
    { _id: '2', name: 'Cires & Sealants', slug: 'cires', count: 6 },
    { _id: '3', name: 'Céramiques', slug: 'ceramiques', count: 3 },
    { _id: '4', name: 'Intérieur', slug: 'interieur', count: 5 },
    { _id: '5', name: 'Accessoires', slug: 'accessoires', count: 8 },
  ]

  const demoProducts = [
    {
      _id: '1',
      name: 'Shampoing pH Neutre Premium',
      description: 'Shampoing haute mousse pour un lavage en douceur. Formule concentrée 1:500.',
      price: 24.90,
      images: [{ url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600' }],
      category: { name: 'Shampoings' },
      rating: 4.8,
      reviews: 24,
      inStock: true,
      badge: 'Bestseller'
    },
    {
      _id: '2',
      name: 'Cire Carnauba Pure',
      description: 'Cire naturelle brésilienne grade 1 pour une brillance incomparable.',
      price: 49.90,
      images: [{ url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600' }],
      category: { name: 'Cires & Sealants' },
      rating: 4.9,
      reviews: 42,
      inStock: true,
      badge: 'Premium'
    },
    {
      _id: '3',
      name: 'Coating Céramique 9H',
      description: 'Protection céramique professionnelle 3-5 ans. Kit complet avec applicateurs.',
      price: 89.90,
      images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' }],
      category: { name: 'Céramiques' },
      rating: 5.0,
      reviews: 18,
      inStock: true,
      badge: 'Pro'
    },
    {
      _id: '4',
      name: 'Nettoyant Cuir Premium',
      description: 'Nettoyant doux pH neutre pour tous types de cuir automobile.',
      price: 19.90,
      images: [{ url: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600' }],
      category: { name: 'Intérieur' },
      rating: 4.7,
      reviews: 31,
      inStock: true
    },
    {
      _id: '5',
      name: 'Kit Microfibre Premium',
      description: 'Lot de 5 microfibres haute qualité 400 GSM. Sans coutures.',
      price: 34.90,
      images: [{ url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600' }],
      category: { name: 'Accessoires' },
      rating: 4.6,
      reviews: 56,
      inStock: true
    },
    {
      _id: '6',
      name: 'Clay Bar Kit Décontamination',
      description: 'Kit complet avec 2 barres de clay et lubrifiant 500ml.',
      price: 39.90,
      images: [{ url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600' }],
      category: { name: 'Accessoires' },
      rating: 4.8,
      reviews: 28,
      inStock: true
    },
    {
      _id: '7',
      name: 'Polish Correctif One Step',
      description: 'Polish tout-en-un pour correction légère et finition brillante.',
      price: 32.90,
      originalPrice: 39.90,
      images: [{ url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600' }],
      category: { name: 'Cires & Sealants' },
      rating: 4.5,
      reviews: 19,
      inStock: true,
      badge: 'Promo'
    },
    {
      _id: '8',
      name: 'Spray Céramique Express',
      description: 'Protection céramique en spray. Application facile, résultat pro.',
      price: 29.90,
      images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' }],
      category: { name: 'Céramiques' },
      rating: 4.4,
      reviews: 37,
      inStock: false
    },
  ]

  const displayProducts = products.length > 0 ? products : demoProducts
  const displayCategories = categories.length > 0 ? categories : demoCategories

  const filteredProducts = displayProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category?.name === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (product) => {
    addToCart(product)
    setIsCartOpen(true)
  }

  const cartTotal = getCartTotal()
  const cartCount = getCartCount()

  return (
    <>
      <SEOHead page="shop" />

      <div className="min-h-screen bg-sand-50 pt-[72px]">
        {/* Hero compact */}
        <div className="bg-white border-b border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-dark-900">
                  Boutique<span className="text-primary-500">.</span>
                </h1>
                <p className="text-dark-500 mt-1">Produits de detailing professionnels</p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-sand-50 border border-sand-200 rounded-xl text-dark-900 focus:outline-none focus:border-dark-400 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-[100px]">
                <h3 className="text-sm font-semibold text-dark-900 uppercase tracking-wider mb-4">
                  Catégories
                </h3>
                <nav className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-dark-900 text-white'
                        : 'text-dark-600 hover:bg-sand-100'
                    }`}
                  >
                    <span>Tous les produits</span>
                    <span className={`text-sm ${selectedCategory === 'all' ? 'text-white/60' : 'text-dark-400'}`}>
                      {displayProducts.length}
                    </span>
                  </button>
                  {displayCategories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                        selectedCategory === cat.name
                          ? 'bg-dark-900 text-white'
                          : 'text-dark-600 hover:bg-sand-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-sm ${selectedCategory === cat.name ? 'text-white/60' : 'text-dark-400'}`}>
                        {cat.count || displayProducts.filter(p => p.category?.name === cat.name).length}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] left-4 z-40 flex items-center gap-2 px-4 py-3 bg-white border border-sand-200 rounded-full shadow-lg"
            >
              <Filter className="w-5 h-5" />
              Filtres
            </button>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-dark-500">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                      <div className="aspect-square bg-sand-100 rounded-xl mb-4" />
                      <div className="h-4 bg-sand-100 rounded mb-2" />
                      <div className="h-4 bg-sand-100 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="w-16 h-16 text-dark-300 mx-auto mb-4" />
                  <p className="text-dark-500">Aucun produit trouvé</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image */}
                      <Link to={`/boutique/${product._id}`} className="block relative aspect-square overflow-hidden">
                        <img
                          src={product.images?.[0]?.url || 'https://via.placeholder.com/400'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.badge && (
                          <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
                            product.badge === 'Promo' ? 'bg-red-500 text-white' :
                            product.badge === 'Pro' ? 'bg-dark-900 text-white' :
                            'bg-primary-500 text-white'
                          }`}>
                            {product.badge}
                          </span>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <span className="text-dark-500 font-medium">Rupture de stock</span>
                          </div>
                        )}
                      </Link>

                      {/* Content */}
                      <div className="p-5">
                        <span className="text-dark-400 text-xs uppercase tracking-wider">
                          {product.category?.name}
                        </span>

                        <Link to={`/boutique/${product._id}`}>
                          <h3 className="text-dark-900 font-semibold mt-1 mb-3 line-clamp-1 group-hover:text-primary-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-dark-900">
                              CHF {(product.price || 0).toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-dark-400 line-through">
                                CHF {product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              product.inStock
                                ? 'bg-dark-900 hover:bg-dark-800 text-white hover:scale-110'
                                : 'bg-sand-200 text-dark-400 cursor-not-allowed'
                            }`}
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-40 flex items-center gap-3 px-6 py-4 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-full shadow-2xl transition-all hover:scale-105"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>CHF {cartTotal.toFixed(2)}</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* Cart Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-dark-900/50 z-50"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-sand-200">
                  <h2 className="text-xl font-display font-bold text-dark-900">
                    Panier ({cartCount})
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center hover:bg-sand-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-auto p-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 text-dark-200 mx-auto mb-4" />
                      <p className="text-dark-500">Votre panier est vide</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item._id} className="flex gap-4 p-4 bg-sand-50 rounded-xl">
                          <img
                            src={item.images?.[0]?.url}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-dark-900 line-clamp-1">{item.name}</h4>
                            <p className="text-dark-500 text-sm">CHF {item.price.toFixed(2)}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="w-7 h-7 rounded-full bg-white border border-sand-200 flex items-center justify-center"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full bg-white border border-sand-200 flex items-center justify-center"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-dark-400 hover:text-red-500"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t border-sand-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-dark-500">Total</span>
                      <span className="text-2xl font-bold text-dark-900">CHF {cartTotal.toFixed(2)}</span>
                    </div>
                    <Link to="/panier" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-xl transition-all">
                      Voir le panier
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileFilterOpen(false)}
                className="fixed inset-0 bg-dark-900/50 z-50"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30 }}
                className="fixed left-0 right-0 bottom-0 bg-white z-50 rounded-t-3xl max-h-[80vh] overflow-auto"
              >
                <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-dark-900">Catégories</h3>
                    <button onClick={() => setIsMobileFilterOpen(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => { setSelectedCategory('all'); setIsMobileFilterOpen(false) }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left ${
                        selectedCategory === 'all' ? 'bg-dark-900 text-white' : 'bg-sand-100 text-dark-600'
                      }`}
                    >
                      <span>Tous les produits</span>
                    </button>
                    {displayCategories.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => { setSelectedCategory(cat.name); setIsMobileFilterOpen(false) }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left ${
                          selectedCategory === cat.name ? 'bg-dark-900 text-white' : 'bg-sand-100 text-dark-600'
                        }`}
                      >
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default ShopV2
