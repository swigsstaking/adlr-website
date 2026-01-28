import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Clock, BookOpen, ShoppingBag, ShoppingCart, ChevronRight, Droplets, Sparkles, Shield, Armchair, Loader2, Check } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { useCart } from '../context/CartContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [tutorials, setTutorials] = useState([])
  const [loading, setLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState({})
  const { addToCart } = useCart()

  const handleAddProductsToCart = async (tutorial) => {
    if (!tutorial.products || tutorial.products.length === 0) return

    // Fetch product details for each product
    for (const product of tutorial.products) {
      if (product.productId) {
        try {
          const response = await fetch(`${API_URL}/products/public/${product.productId}?siteId=adlr`)
          const data = await response.json()
          if (data.success && data.data) {
            const quantity = product.quantity || 1
            addToCart(data.data, quantity)
          }
        } catch (error) {
          console.error('Error fetching product:', error)
        }
      }
    }

    // Show success feedback
    setAddedToCart(prev => ({ ...prev, [tutorial._id || tutorial.id]: true }))
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [tutorial._id || tutorial.id]: false }))
    }, 2000)
  }

  const categories = [
    { id: 'all', name: 'Tous', icon: BookOpen },
    { id: 'lavage', name: 'Lavage', icon: Droplets },
    { id: 'polish', name: 'Polish', icon: Sparkles },
    { id: 'ceramique', name: 'Céramique', icon: Shield },
    { id: 'cire', name: 'Cire', icon: Shield },
    { id: 'interieur', name: 'Intérieur', icon: Armchair },
  ]

  // Données de fallback
  const fallbackTutorials = [
    {
      id: 1,
      slug: 'methode-deux-seaux',
      title: 'La Méthode des Deux Seaux',
      category: 'lavage',
      description: 'La technique professionnelle pour laver votre voiture sans créer de micro-rayures.',
      duration: '15 min',
      difficulty: 'debutant',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800',
      steps: [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }, { title: '5' }, { title: '6' }],
      products: [
        { name: 'Shampoing pH Neutre', link: '/boutique' },
        { name: 'Gant de lavage microfibre', link: '/boutique' },
        { name: 'Kit 2 seaux + grilles', link: '/boutique' },
      ]
    },
    {
      id: 2,
      slug: 'decontamination-clay-bar',
      title: 'Décontamination à la Clay Bar',
      category: 'lavage',
      description: 'Éliminez les contaminants incrustés dans votre peinture : goudron, résidus ferreux.',
      duration: '20 min',
      difficulty: 'intermediaire',
      image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800',
      steps: [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }, { title: '5' }, { title: '6' }],
      products: [
        { name: 'Clay Bar Kit complet', link: '/boutique' },
        { name: 'Lubrifiant Clay', link: '/boutique' },
      ]
    },
    {
      id: 3,
      slug: 'polish-correctif',
      title: 'Polish Correctif : Éliminer les Micro-rayures',
      category: 'polish',
      description: 'Guide complet pour corriger les défauts de peinture avec une polisseuse orbitale.',
      duration: '45 min',
      difficulty: 'avance',
      image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800',
      steps: [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }, { title: '5' }, { title: '6' }],
      products: [
        { name: 'Polisseuse orbitale', link: '/boutique' },
        { name: 'Set de pads (4 pcs)', link: '/boutique' },
      ]
    },
    {
      id: 4,
      slug: 'application-ceramique',
      title: 'Application Protection Céramique',
      category: 'ceramique',
      description: 'Comment appliquer correctement un coating céramique pour une protection longue durée.',
      duration: '60 min',
      difficulty: 'avance',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
      steps: [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }, { title: '5' }, { title: '6' }],
      products: [
        { name: 'Coating Céramique 9H', link: '/boutique' },
        { name: 'IPA Dégraissant', link: '/boutique' },
      ]
    },
    {
      id: 5,
      slug: 'nettoyage-cuir',
      title: 'Nettoyage et Traitement Cuir',
      category: 'interieur',
      description: 'Entretenez et protégez vos sièges en cuir avec les bons produits et techniques.',
      duration: '30 min',
      difficulty: 'intermediaire',
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800',
      steps: [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }, { title: '5' }, { title: '6' }],
      products: [
        { name: 'Nettoyant Cuir Premium', link: '/boutique' },
        { name: 'Crème protection cuir', link: '/boutique' },
      ]
    },
    {
      id: 6,
      slug: 'renovation-plastiques',
      title: 'Rénovation des Plastiques Extérieurs',
      category: 'cire',
      description: 'Redonnez vie aux plastiques ternis et grisés de votre véhicule.',
      duration: '25 min',
      difficulty: 'debutant',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      steps: [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }, { title: '5' }, { title: '6' }],
      products: [
        { name: 'Rénovateur plastiques', link: '/boutique' },
        { name: 'APC nettoyant', link: '/boutique' },
      ]
    }
  ]

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/public/tutorials?siteId=adlr`)
        if (!response.ok) throw new Error('Erreur de chargement')
        const data = await response.json()
        if (data.success && data.data && data.data.length > 0) {
          setTutorials(data.data)
        } else {
          setTutorials(fallbackTutorials)
        }
      } catch (err) {
        console.error('Erreur chargement tutoriels:', err)
        setTutorials(fallbackTutorials)
      } finally {
        setLoading(false)
      }
    }
    fetchTutorials()
  }, [])

  const filteredTutorials = selectedCategory === 'all'
    ? tutorials
    : tutorials.filter(t => t.category === selectedCategory)

  const getDifficultyLabel = (difficulty) => {
    const labels = { 'debutant': 'Débutant', 'intermediaire': 'Intermédiaire', 'avance': 'Avancé' }
    return labels[difficulty] || difficulty
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'debutant': return 'text-green-700 bg-green-100'
      case 'intermediaire': return 'text-amber-700 bg-amber-100'
      case 'avance': return 'text-red-700 bg-red-100'
      default: return 'text-dark-500 bg-sand-200'
    }
  }

  return (
    <>
      <SEOHead page="tutorials" />

      <div className="min-h-screen bg-sand-50 pt-[72px]">
        {/* Hero */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-dark-400 text-sm font-semibold uppercase tracking-wider">Guides & Tutoriels</span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mt-3 mb-6">
                Apprenez le Detailing<span className="text-dark-400">.</span>
              </h1>
              <p className="text-lg text-dark-500">
                Des techniques professionnelles expliquées étape par étape
              </p>
            </motion.div>
          </div>
        </div>

        {/* Categories - sans border */}
        <div className="bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-dark-900 text-white'
                      : 'bg-sand-100 text-dark-600 hover:bg-sand-200'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-dark-900 animate-spin" />
            </div>
          ) : filteredTutorials.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-dark-500">Aucun tutoriel dans cette catégorie.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {filteredTutorials.map((tutorial, index) => (
                <motion.div
                  key={tutorial._id || tutorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <Link
                      to={`/tutoriels/${tutorial.slug || tutorial._id || tutorial.id}`}
                      className="relative lg:w-2/5 aspect-[4/3] lg:aspect-auto overflow-hidden group"
                    >
                      <img
                        src={tutorial.image}
                        alt={tutorial.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xl">
                          <Play className="w-7 h-7 text-dark-900 ml-0.5" />
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                        <span className="flex items-center px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-dark-900 text-base font-medium shadow-md">
                          <Clock className="w-4 h-4 mr-2" />
                          {tutorial.duration}
                        </span>
                        <span className={`px-4 py-2 rounded-full text-base font-semibold shadow-md ${getDifficultyColor(tutorial.difficulty)}`}>
                          {getDifficultyLabel(tutorial.difficulty)}
                        </span>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="lg:w-3/5 p-8 flex flex-col">
                      <div className="flex-1">
                        <span className="text-dark-400 text-sm font-semibold uppercase tracking-wider">
                          {categories.find(c => c.id === tutorial.category)?.name || tutorial.category}
                        </span>
                        <Link to={`/tutoriels/${tutorial.slug || tutorial._id || tutorial.id}`}>
                          <h3 className="text-dark-900 font-bold text-2xl mt-3 mb-4 hover:text-dark-600 transition-colors line-clamp-2">
                            {tutorial.title}
                          </h3>
                        </Link>
                        <p className="text-dark-500 text-lg line-clamp-3 mb-5">
                          {tutorial.description}
                        </p>

                        {tutorial.steps && tutorial.steps.length > 0 && (
                          <div className="flex items-center text-dark-400 text-base mb-5">
                            <BookOpen className="w-5 h-5 mr-2" />
                            {tutorial.steps.length} étapes
                          </div>
                        )}
                      </div>

                      {/* Products */}
                      {tutorial.products && tutorial.products.length > 0 && (
                        <div className="pt-4 border-t border-sand-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-dark-900 text-sm font-semibold">
                              <ShoppingBag className="w-4 h-4" />
                              Produits nécessaires
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                handleAddProductsToCart(tutorial)
                              }}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                addedToCart[tutorial._id || tutorial.id]
                                  ? 'bg-green-600 text-white'
                                  : 'bg-dark-900 text-white hover:bg-dark-800'
                              }`}
                            >
                              {addedToCart[tutorial._id || tutorial.id] ? (
                                <>
                                  <Check className="w-4 h-4" />
                                  Ajouté !
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-4 h-4" />
                                  Ajouter tout
                                </>
                              )}
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {tutorial.products.slice(0, 4).map((product, i) => (
                              <span key={i} className="text-sm text-dark-600 bg-sand-100 px-3 py-1.5 rounded-full font-medium">
                                {product.quantity && product.quantity > 1 ? `${product.quantity}x ` : ''}{product.name}
                              </span>
                            ))}
                            {tutorial.products.length > 4 && (
                              <span className="text-sm text-dark-400 px-3 py-1.5">
                                +{tutorial.products.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <Link
                        to={`/tutoriels/${tutorial.slug || tutorial._id || tutorial.id}`}
                        className="mt-5 inline-flex items-center text-dark-900 text-base font-semibold hover:text-dark-600 transition-colors group"
                      >
                        Voir le tutoriel
                        <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-dark-900 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Préférez confier votre véhicule à des pros ?
              </h2>
              <p className="text-white/60 mb-8">
                Nos experts réalisent ces prestations avec un savoir-faire inégalé
              </p>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-sand-100 text-dark-900 font-semibold rounded-full transition-all"
              >
                Découvrir nos services
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tutorials
