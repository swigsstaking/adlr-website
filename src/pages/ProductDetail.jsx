import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Minus, ShoppingCart, ChevronLeft, Truck, Shield, RotateCcw, Package, Check } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { useCart } from '../context/CartContext'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || 'adlr'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  // Auto-select first variant when product loads
  useEffect(() => {
    if (product?.variants?.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0])
    }
  }, [product])

  // Get current price/image based on variant selection
  const currentPrice = selectedVariant?.price || product?.price?.amount || product?.price || 0
  const currentImage = selectedVariant?.image || product?.images?.[selectedImage]?.url || product?.images?.[selectedImage] || product?.images?.[0]?.url || product?.images?.[0]

  // Check stock availability - use variant stock if variant selected, otherwise product stock
  const isInStock = selectedVariant
    ? (selectedVariant.stock > 0 || selectedVariant.stock === undefined)
    : (product?.stock > 0 || product?.inStock !== false)

  // Demo products for fallback
  const demoProducts = [
    {
      _id: '1',
      name: 'Shampoing pH Neutre Premium',
      description: 'Shampoing haute mousse pour un lavage en douceur. Formule concentrée 1:500.',
      longDescription: `Notre shampoing pH neutre premium est spécialement formulé pour les passionnés de detailing qui recherchent le meilleur pour leur véhicule.

**Caractéristiques:**
- pH parfaitement neutre (7.0) - sans danger pour les protections céramiques et cires
- Formule ultra-concentrée - dilution 1:500
- Mousse dense et onctueuse pour un lavage sans contact
- Parfum frais et agréable
- Rinçage facile sans traces

**Contenance:** 500ml

**Mode d'emploi:**
1. Diluer 10ml dans 5L d'eau
2. Appliquer à l'aide d'un canon à mousse ou seau
3. Laisser agir 2-3 minutes
4. Rincer abondamment`,
      price: 24.90,
      images: [
        { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800' },
        { url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800' },
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
      ],
      category: { name: 'Shampoings' },
      rating: 4.8,
      reviews: 24,
      inStock: true,
      badge: 'Bestseller',
      features: ['pH Neutre', 'Concentré 1:500', 'Sans danger céramique', '500ml']
    },
    {
      _id: '2',
      name: 'Cire Carnauba Pure',
      description: 'Cire naturelle brésilienne grade 1 pour une brillance incomparable.',
      longDescription: `La cire Carnauba pure est le choix des perfectionnistes qui recherchent une brillance exceptionnelle et une profondeur de couleur inégalée.

**Caractéristiques:**
- Carnauba brésilienne grade 1 (la plus pure)
- Brillance miroir exceptionnelle
- Protection UV naturelle
- Durabilité 3-4 mois
- Application facile

**Contenance:** 200ml

**Mode d'emploi:**
1. Appliquer sur une surface propre et sèche
2. Utiliser un applicateur mousse
3. Laisser sécher jusqu'à formation d'un voile
4. Lustrer avec une microfibre douce`,
      price: 49.90,
      images: [
        { url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800' },
        { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800' },
      ],
      category: { name: 'Cires & Sealants' },
      rating: 4.9,
      reviews: 42,
      inStock: true,
      badge: 'Premium',
      features: ['Carnauba Grade 1', 'Brillance miroir', 'Protection 3-4 mois', '200ml']
    },
    {
      _id: '3',
      name: 'Coating Céramique 9H',
      description: 'Protection céramique professionnelle 3-5 ans. Kit complet avec applicateurs.',
      longDescription: `Notre coating céramique 9H offre la protection ultime pour votre véhicule. Utilisé par les professionnels du detailing.

**Caractéristiques:**
- Dureté 9H (la plus élevée)
- Protection 3 à 5 ans
- Effet hydrophobe extrême
- Résistance aux UV et produits chimiques
- Facilite l'entretien

**Contenu du kit:**
- 50ml de coating céramique
- 2 applicateurs mousse
- 5 suede cloths
- 2 microfibres de finition
- Gants nitrile
- Instructions détaillées`,
      price: 89.90,
      images: [
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
        { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800' },
      ],
      category: { name: 'Céramiques' },
      rating: 5.0,
      reviews: 18,
      inStock: true,
      badge: 'Pro',
      features: ['Dureté 9H', 'Protection 3-5 ans', 'Kit complet', 'Usage pro']
    },
    {
      _id: '4',
      name: 'Nettoyant Cuir Premium',
      description: 'Nettoyant doux pH neutre pour tous types de cuir automobile.',
      longDescription: `Nettoyant spécialement formulé pour le cuir automobile. Nettoie en profondeur sans agresser.`,
      price: 19.90,
      images: [{ url: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800' }],
      category: { name: 'Intérieur' },
      rating: 4.7,
      reviews: 31,
      inStock: true,
      features: ['pH Neutre', 'Tous types cuir', 'Sans solvant', '500ml']
    },
    {
      _id: '5',
      name: 'Kit Microfibre Premium',
      description: 'Lot de 5 microfibres haute qualité 400 GSM. Sans coutures.',
      longDescription: `Microfibres professionnelles haute densité pour un lustrage parfait sans micro-rayures.`,
      price: 34.90,
      images: [{ url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800' }],
      category: { name: 'Accessoires' },
      rating: 4.6,
      reviews: 56,
      inStock: true,
      features: ['400 GSM', 'Sans coutures', 'Lot de 5', '40x40cm']
    },
    {
      _id: '6',
      name: 'Clay Bar Kit Décontamination',
      description: 'Kit complet avec 2 barres de clay et lubrifiant 500ml.',
      longDescription: `Kit de décontamination professionnel pour éliminer toutes les contaminations incrustées.`,
      price: 39.90,
      images: [{ url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800' }],
      category: { name: 'Accessoires' },
      rating: 4.8,
      reviews: 28,
      inStock: true,
      features: ['2 barres clay', 'Lubrifiant 500ml', 'Grade moyen', 'Pro']
    },
  ]

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const siteRes = await fetch(`${API_URL}/public/sites/${SITE_SLUG}`)
        const siteData = await siteRes.json()

        if (siteData.success && siteData.data?._id) {
          const siteId = siteData.data._id
          const productRes = await fetch(`${API_URL}/products/public/${id}?siteId=${siteId}`)
          const productData = await productRes.json()

          if (productData.success) {
            setProduct(productData.data)
            // Fetch related products
            const relatedRes = await fetch(`${API_URL}/products/public?siteId=${siteId}&limit=4`)
            const relatedData = await relatedRes.json()
            if (relatedData.success) {
              setRelatedProducts(relatedData.data.filter(p => p._id !== id).slice(0, 4))
            }
          } else {
            // Fallback to demo
            const demoProduct = demoProducts.find(p => p._id === id)
            setProduct(demoProduct || demoProducts[0])
            setRelatedProducts(demoProducts.filter(p => p._id !== id).slice(0, 4))
          }
        }
      } catch (error) {
        console.error('Erreur chargement produit:', error)
        const demoProduct = demoProducts.find(p => p._id === id)
        setProduct(demoProduct || demoProducts[0])
        setRelatedProducts(demoProducts.filter(p => p._id !== id).slice(0, 4))
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-[72px] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-dark-900 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-dark-300 mx-auto mb-4" />
          <p className="text-dark-500 mb-4">Produit non trouvé</p>
          <Link to="/boutique" className="text-primary-500 hover:underline">
            Retour à la boutique
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={`${product.name} | Boutique ADLR`}
        description={product.description}
      />

      <div className="min-h-screen bg-white pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <div className="bg-sand-50 border-b border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/boutique" className="text-dark-500 hover:text-dark-900 flex items-center gap-1 flex-shrink-0">
                <ChevronLeft className="w-4 h-4" />
                <span>Boutique</span>
              </Link>
              <span className="text-dark-300 hidden sm:inline">/</span>
              <span className="text-dark-500 hidden sm:inline flex-shrink-0">{product.category?.name}</span>
              <span className="text-dark-300 hidden sm:inline">/</span>
              <span className="text-dark-900 font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Images */}
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative aspect-square rounded-3xl overflow-hidden bg-sand-100 mb-4"
                >
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <span className={`absolute top-4 left-4 px-4 py-2 text-sm font-semibold rounded-full ${
                      product.badge === 'Promo' ? 'bg-red-500 text-white' :
                      product.badge === 'Pro' ? 'bg-dark-900 text-white' :
                      'bg-primary-500 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </motion.div>

                {/* Thumbnails */}
                {product.images?.length > 1 && (
                  <div className="flex gap-3">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === i ? 'border-dark-900' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img?.url || img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">
                  {product.category?.name}
                </span>

                <h1 className="text-3xl md:text-4xl font-display font-bold text-dark-900 mt-2 mb-6">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold text-dark-900">
                    CHF {Number(currentPrice).toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-dark-400 line-through">
                      CHF {Number(product.originalPrice?.amount ?? product.originalPrice ?? 0).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Variants Selector */}
                {product.variants?.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-dark-700 mb-3">
                      Variante
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedVariant(selectedVariant?.name === variant.name ? null : variant)}
                          className={`px-4 py-2 rounded-xl border-2 font-medium transition-all ${
                            selectedVariant?.name === variant.name
                              ? 'border-dark-900 bg-dark-900 text-white'
                              : 'border-sand-300 hover:border-dark-400 text-dark-700'
                          }`}
                        >
                          {variant.name}
                          {variant.price && (
                            <span className="ml-2 text-sm opacity-75">
                              CHF {Number(variant.price).toFixed(2)}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-dark-600 text-lg mb-6">
                  {product.description}
                </p>

                {/* Features */}
                {product.features && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {product.features.map((feature, i) => (
                      <span key={i} className="px-3 py-1.5 bg-sand-100 text-dark-700 text-sm rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* Add to Cart */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center border border-sand-300 rounded-xl">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-12 h-12 flex items-center justify-center text-dark-600 hover:text-dark-900"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-semibold text-dark-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-12 h-12 flex items-center justify-center text-dark-600 hover:text-dark-900"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (isInStock) {
                        // Include variant info in cart item
                        const cartItem = selectedVariant
                          ? { ...product, selectedVariant, price: { amount: selectedVariant.price || product.price?.amount } }
                          : product
                        addToCart(cartItem, quantity)
                        setAddedToCart(true)
                        setTimeout(() => setAddedToCart(false), 2000)
                      }
                    }}
                    disabled={!isInStock}
                    className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all ${
                      addedToCart
                        ? 'bg-green-600 text-white'
                        : isInStock
                        ? 'bg-dark-900 hover:bg-dark-800 text-white'
                        : 'bg-sand-200 text-dark-400 cursor-not-allowed'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        Ajouté au panier !
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        {isInStock ? 'Ajouter au panier' : 'Rupture de stock'}
                      </>
                    )}
                  </button>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-sand-50 rounded-2xl">
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-dark-600 mx-auto mb-2" />
                    <p className="text-xs text-dark-600">Livraison gratuite dès CHF 50</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-dark-600 mx-auto mb-2" />
                    <p className="text-xs text-dark-600">Paiement sécurisé</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 text-dark-600 mx-auto mb-2" />
                    <p className="text-xs text-dark-600">Retours sous 14 jours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Long Description */}
        {product.longDescription && (
          <section className="py-12 bg-sand-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
                Description détaillée
              </h2>
              <div className="prose prose-dark max-w-none">
                {product.longDescription.split('\n').map((paragraph, i) => (
                  <p key={i} className="text-dark-600 mb-4 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-display font-bold text-dark-900 mb-8">
                Produits similaires
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relProduct) => (
                  <Link
                    key={relProduct._id}
                    to={`/boutique/${relProduct._id}`}
                    className="group bg-white rounded-2xl border border-sand-200 overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relProduct.images?.[0]?.url || relProduct.images?.[0]}
                        alt={relProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-dark-900 font-medium line-clamp-1 group-hover:text-primary-600 transition-colors">
                        {relProduct.name}
                      </h3>
                      <p className="text-dark-900 font-bold mt-1">
                        CHF {Number(relProduct.price?.amount ?? relProduct.price ?? 0).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export default ProductDetail
