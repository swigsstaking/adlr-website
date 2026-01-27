import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Filter, Search, ChevronDown, Plus, Package } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { useCart } from '../context/CartContext'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || 'adlr'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const { cart, addToCart, getCartTotal, getCartCount } = useCart()

  // Fetch products and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch site info first to get siteId
        const siteRes = await fetch(`${API_URL}/public/sites/${SITE_SLUG}`)
        const siteData = await siteRes.json()

        if (siteData.success && siteData.data?._id) {
          const siteId = siteData.data._id

          // Fetch products and categories
          const [productsRes, categoriesRes] = await Promise.all([
            fetch(`${API_URL}/products/public?siteId=${siteId}`),
            fetch(`${API_URL}/categories/public?siteId=${siteId}`)
          ])

          const productsData = await productsRes.json()
          const categoriesData = await categoriesRes.json()

          if (productsData.success) {
            setProducts(productsData.data || [])
          }
          if (categoriesData.success) {
            setCategories(categoriesData.data || [])
          }
        }
      } catch (error) {
        console.error('Erreur chargement boutique:', error)
        // Use demo data as fallback
        setProducts(demoProducts)
        setCategories(demoCategories)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Demo data for development
  const demoCategories = [
    { _id: '1', name: 'Shampoings', slug: 'shampoings' },
    { _id: '2', name: 'Cires & Sealants', slug: 'cires' },
    { _id: '3', name: 'Céramiques', slug: 'ceramiques' },
    { _id: '4', name: 'Intérieur', slug: 'interieur' },
    { _id: '5', name: 'Accessoires', slug: 'accessoires' },
  ]

  const demoProducts = [
    {
      _id: '1',
      name: 'Shampoing pH Neutre Premium',
      description: 'Shampoing haute mousse pour un lavage en douceur',
      price: 24.90,
      images: [{ url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400' }],
      category: { name: 'Shampoings' },
      rating: 4.8,
      inStock: true
    },
    {
      _id: '2',
      name: 'Cire Carnauba Pure',
      description: 'Cire naturelle pour une brillance incomparable',
      price: 49.90,
      images: [{ url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400' }],
      category: { name: 'Cires & Sealants' },
      rating: 4.9,
      inStock: true
    },
    {
      _id: '3',
      name: 'Coating Céramique 9H',
      description: 'Protection céramique professionnelle longue durée',
      price: 89.90,
      images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' }],
      category: { name: 'Céramiques' },
      rating: 5.0,
      inStock: true
    },
    {
      _id: '4',
      name: 'Nettoyant Cuir Premium',
      description: 'Nettoyant doux pour tous types de cuir',
      price: 19.90,
      images: [{ url: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400' }],
      category: { name: 'Intérieur' },
      rating: 4.7,
      inStock: true
    },
    {
      _id: '5',
      name: 'Kit Microfibre Premium (5 pcs)',
      description: 'Microfibres haute qualité 400 GSM',
      price: 34.90,
      images: [{ url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400' }],
      category: { name: 'Accessoires' },
      rating: 4.6,
      inStock: true
    },
    {
      _id: '6',
      name: 'Clay Bar Kit',
      description: 'Kit de décontamination complet avec lubrifiant',
      price: 39.90,
      images: [{ url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400' }],
      category: { name: 'Accessoires' },
      rating: 4.8,
      inStock: true
    },
  ]

  const displayProducts = products.length > 0 ? products : demoProducts
  const displayCategories = categories.length > 0 ? categories : demoCategories

  const filteredProducts = displayProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category?.name === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const cartTotal = getCartTotal()
  const cartCount = getCartCount()

  return (
    <>
      <SEOHead page="shop" />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-sand-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">Notre sélection</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mt-3 mb-6">
              Boutique Detailing<span className="text-primary-500">.</span>
            </h1>
            <p className="text-lg text-dark-500">
              Une sélection de produits professionnels pour prendre soin de votre véhicule
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar - non sticky */}
      <section className="py-6 bg-sand-100 border-y border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-sand-300 rounded-full text-dark-900 focus:outline-none focus:border-dark-900 transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-dark-900 text-white'
                    : 'bg-white text-dark-600 hover:bg-sand-200 border border-sand-300'
                }`}
              >
                Tous
              </button>
              {displayCategories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.name
                      ? 'bg-dark-900 text-white'
                      : 'bg-white text-dark-600 hover:bg-sand-200 border border-sand-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Cart Button */}
            <button className="relative flex items-center px-5 py-3 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-full transition-all">
              <ShoppingCart className="w-5 h-5 mr-2" />
              CHF {cartTotal.toFixed(2)}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-sand-300 text-dark-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-sand-100 rounded-3xl p-4 animate-pulse">
                  <div className="aspect-square bg-sand-200 rounded-2xl mb-4" />
                  <div className="h-4 bg-sand-200 rounded mb-2" />
                  <div className="h-4 bg-sand-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-dark-300 mx-auto mb-4" />
              <p className="text-dark-500">Aucun produit trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-3xl border border-sand-200 overflow-hidden hover:border-dark-300 hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <Link to={`/boutique/${product._id}`} className="block relative aspect-square overflow-hidden bg-sand-100">
                    <img
                      src={product.images?.[0]?.url || 'https://via.placeholder.com/400'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <span className="text-dark-500 font-medium">Rupture de stock</span>
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    <span className="text-dark-400 text-xs uppercase tracking-wider">
                      {product.category?.name || 'Produit'}
                    </span>

                    <Link to={`/boutique/${product._id}`}>
                      <h3 className="text-dark-900 font-semibold mt-1 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-dark-500 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-dark-900">
                        CHF {(product.price || 0).toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          product.inStock
                            ? 'bg-dark-900 hover:bg-dark-800 text-white'
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
      </section>

      {/* CTA to Tutorials */}
      <section className="py-20 bg-sand-300/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-dark-900 mb-4">
              Besoin de conseils d'utilisation ?
            </h2>
            <p className="text-dark-500 mb-8">
              Découvrez nos tutoriels détaillés pour utiliser ces produits comme un pro
            </p>
            <Link
              to="/tutoriels"
              className="inline-flex items-center px-6 py-3 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-full transition-all"
            >
              Voir les tutoriels
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Shop
