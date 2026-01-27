import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Clock, BookOpen, ShoppingBag, ChevronRight, CheckCircle, Star } from 'lucide-react'
import SEOHead from '../components/SEOHead'

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'lavage', name: 'Lavage' },
    { id: 'polish', name: 'Polish' },
    { id: 'protection', name: 'Protection' },
    { id: 'interieur', name: 'Intérieur' },
  ]

  const tutorials = [
    {
      id: 1,
      title: 'La Méthode des Deux Seaux',
      category: 'lavage',
      description: 'La technique professionnelle pour laver votre voiture sans créer de micro-rayures. Apprenez à utiliser correctement deux seaux avec grilles.',
      duration: '15 min',
      difficulty: 'Débutant',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800',
      steps: [
        'Préparer les deux seaux avec les grilles',
        'Remplir le premier seau de shampoing',
        'Remplir le second seau d\'eau claire',
        'Commencer par le toit et descendre',
        'Rincer le gant dans le seau d\'eau claire',
        'Recharger le gant dans le seau de shampoing'
      ],
      products: [
        { name: 'Shampoing pH Neutre', price: 24.90 },
        { name: 'Gant de lavage microfibre', price: 19.90 },
        { name: 'Kit 2 seaux + grilles', price: 49.90 },
      ]
    },
    {
      id: 2,
      title: 'Décontamination à la Clay Bar',
      category: 'lavage',
      description: 'Éliminez les contaminants incrustés dans votre peinture : goudron, résidus ferreux, pollution industrielle.',
      duration: '20 min',
      difficulty: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800',
      steps: [
        'Laver et sécher le véhicule',
        'Vaporiser le lubrifiant sur une section',
        'Passer la clay bar en mouvements linéaires',
        'Replier la clay bar pour une surface propre',
        'Essuyer avec une microfibre',
        'Répéter sur tout le véhicule'
      ],
      products: [
        { name: 'Clay Bar Kit complet', price: 39.90 },
        { name: 'Lubrifiant Clay', price: 14.90 },
        { name: 'Microfibre buffing', price: 9.90 },
      ]
    },
    {
      id: 3,
      title: 'Polish Correctif : Éliminer les Micro-rayures',
      category: 'polish',
      description: 'Guide complet pour corriger les défauts de peinture : swirls, hologrammes et micro-rayures avec une polisseuse orbitale.',
      duration: '45 min',
      difficulty: 'Avancé',
      image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800',
      steps: [
        'Évaluer l\'état de la peinture avec une lampe',
        'Choisir le bon pad et compound',
        'Régler la vitesse de la polisseuse',
        'Travailler section par section (50x50cm)',
        'Contrôler le résultat avec la lampe',
        'Finir avec un polish de finition'
      ],
      products: [
        { name: 'Polisseuse orbitale', price: 189.00 },
        { name: 'Set de pads (4 pcs)', price: 49.90 },
        { name: 'Compound correctif', price: 29.90 },
        { name: 'Polish finition', price: 34.90 },
      ]
    },
    {
      id: 4,
      title: 'Application Protection Céramique',
      category: 'protection',
      description: 'Comment appliquer correctement un coating céramique pour une protection longue durée de votre carrosserie.',
      duration: '60 min',
      difficulty: 'Avancé',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
      steps: [
        'Décontaminer et polir la surface',
        'Dégraisser à l\'IPA (Isopropanol)',
        'Appliquer le coating sur un applicateur',
        'Étaler en mouvements croisés',
        'Attendre le flash (30-60 sec)',
        'Buffer avec une microfibre sèche'
      ],
      products: [
        { name: 'Coating Céramique 9H', price: 89.90 },
        { name: 'IPA Dégraissant', price: 14.90 },
        { name: 'Applicateur suède', price: 9.90 },
        { name: 'Microfibre ultra-douce', price: 12.90 },
      ]
    },
    {
      id: 5,
      title: 'Nettoyage et Traitement Cuir',
      category: 'interieur',
      description: 'Entretenez et protégez vos sièges en cuir avec les bons produits et techniques pour une longévité maximale.',
      duration: '30 min',
      difficulty: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800',
      steps: [
        'Aspirer les résidus et poussières',
        'Appliquer le nettoyant cuir',
        'Frotter délicatement avec une brosse',
        'Essuyer avec une microfibre humide',
        'Laisser sécher 10 minutes',
        'Appliquer la crème protectrice'
      ],
      products: [
        { name: 'Nettoyant Cuir Premium', price: 19.90 },
        { name: 'Crème protection cuir', price: 24.90 },
        { name: 'Brosse cuir souple', price: 12.90 },
      ]
    },
    {
      id: 6,
      title: 'Rénovation des Plastiques Extérieurs',
      category: 'protection',
      description: 'Redonnez vie aux plastiques ternis et grisés de votre véhicule avec cette technique simple et efficace.',
      duration: '25 min',
      difficulty: 'Débutant',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      steps: [
        'Nettoyer les plastiques à l\'APC',
        'Sécher complètement la surface',
        'Appliquer le renovateur au pinceau',
        'Étaler uniformément',
        'Laisser sécher 5 minutes',
        'Buffer l\'excédent si nécessaire'
      ],
      products: [
        { name: 'Rénovateur plastiques', price: 19.90 },
        { name: 'APC nettoyant multi-surfaces', price: 14.90 },
        { name: 'Pinceau applicateur', price: 7.90 },
      ]
    }
  ]

  const filteredTutorials = selectedCategory === 'all'
    ? tutorials
    : tutorials.filter(t => t.category === selectedCategory)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Débutant': return 'text-green-600 bg-green-100'
      case 'Intermédiaire': return 'text-yellow-600 bg-yellow-100'
      case 'Avancé': return 'text-red-600 bg-red-100'
      default: return 'text-dark-500 bg-sand-200'
    }
  }

  return (
    <>
      <SEOHead page="tutorials" />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-6">
              Apprenez le Detailing
            </h1>
            <p className="text-xl text-dark-500">
              Des techniques professionnelles expliquées étape par étape, avec les produits recommandés
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-sand-300/30 border-y border-sand-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-dark-900 text-white'
                    : 'bg-white text-dark-600 hover:bg-sand-200 border border-sand-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials List */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {filteredTutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-sand-200 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Image */}
                  <div className="relative aspect-video lg:aspect-auto">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent lg:bg-gradient-to-r" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <span className="flex items-center px-3 py-1 bg-white/90 backdrop-blur rounded-full text-dark-900 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {tutorial.duration}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                        {tutorial.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-2 p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                      {/* Main Info */}
                      <div className="flex-1">
                        <span className="text-dark-900 text-sm font-semibold uppercase tracking-wider">
                          {categories.find(c => c.id === tutorial.category)?.name}
                        </span>
                        <h3 className="text-2xl font-bold text-dark-900 mt-2 mb-4">
                          {tutorial.title}
                        </h3>
                        <p className="text-dark-500 mb-6">
                          {tutorial.description}
                        </p>

                        {/* Steps Preview */}
                        <div className="space-y-2">
                          <h4 className="text-dark-900 font-semibold mb-3">Étapes clés :</h4>
                          {tutorial.steps.slice(0, 4).map((step, i) => (
                            <div key={i} className="flex items-start text-sm">
                              <CheckCircle className="w-4 h-4 text-dark-900 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-dark-600">{step}</span>
                            </div>
                          ))}
                          {tutorial.steps.length > 4 && (
                            <p className="text-dark-400 text-sm ml-7">
                              +{tutorial.steps.length - 4} étapes supplémentaires
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Products */}
                      <div className="lg:w-72 bg-sand-100 rounded-2xl p-5">
                        <div className="flex items-center mb-4">
                          <ShoppingBag className="w-5 h-5 text-dark-900 mr-2" />
                          <h4 className="text-dark-900 font-semibold">Produits nécessaires</h4>
                        </div>
                        <ul className="space-y-3 mb-5">
                          {tutorial.products.map((product, i) => (
                            <li key={i} className="flex items-center justify-between text-sm">
                              <span className="text-dark-600">{product.name}</span>
                              <span className="text-dark-900 font-semibold">
                                CHF {product.price.toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between pt-4 border-t border-sand-300">
                          <span className="text-dark-500 text-sm">Total</span>
                          <span className="text-dark-900 font-bold">
                            CHF {tutorial.products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                          </span>
                        </div>
                        <Link
                          to="/boutique"
                          className="mt-4 w-full flex items-center justify-center px-4 py-2.5 bg-dark-900 hover:bg-dark-800 text-white text-sm font-semibold rounded-full transition-all"
                        >
                          Commander le kit
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-sand-300/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-dark-900 mb-4">
              Préférez-vous confier votre véhicule à des pros ?
            </h2>
            <p className="text-dark-500 mb-8">
              Nos experts réalisent ces prestations avec un savoir-faire inégalé
            </p>
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-full transition-all"
            >
              Découvrir nos services
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Tutorials
