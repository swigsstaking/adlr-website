import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Clock, BookOpen, ChevronRight, Droplets, Sparkles, Shield, Armchair } from 'lucide-react'
import SEOHead from '../components/SEOHead'

/**
 * TutorialsV2 - Design moderne avec cartes visuelles
 */
const TutorialsV2 = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tous', icon: BookOpen },
    { id: 'lavage', name: 'Lavage', icon: Droplets },
    { id: 'polish', name: 'Polish', icon: Sparkles },
    { id: 'protection', name: 'Protection', icon: Shield },
    { id: 'interieur', name: 'Intérieur', icon: Armchair },
  ]

  const tutorials = [
    {
      id: '1',
      title: 'La Méthode des Deux Seaux',
      category: 'lavage',
      description: 'La technique professionnelle pour laver votre voiture sans créer de micro-rayures.',
      duration: '15 min',
      difficulty: 'Débutant',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800',
      steps: 6,
    },
    {
      id: '2',
      title: 'Décontamination à la Clay Bar',
      category: 'lavage',
      description: 'Éliminez les contaminants incrustés dans votre peinture : goudron, résidus ferreux.',
      duration: '20 min',
      difficulty: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800',
      steps: 6,
    },
    {
      id: '3',
      title: 'Polish Correctif : Éliminer les Micro-rayures',
      category: 'polish',
      description: 'Guide complet pour corriger les défauts de peinture avec une polisseuse orbitale.',
      duration: '45 min',
      difficulty: 'Avancé',
      image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800',
      steps: 6,
    },
    {
      id: '4',
      title: 'Application Protection Céramique',
      category: 'protection',
      description: 'Comment appliquer correctement un coating céramique pour une protection longue durée.',
      duration: '60 min',
      difficulty: 'Avancé',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
      steps: 6,
    },
    {
      id: '5',
      title: 'Nettoyage et Traitement Cuir',
      category: 'interieur',
      description: 'Entretenez et protégez vos sièges en cuir avec les bons produits et techniques.',
      duration: '30 min',
      difficulty: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800',
      steps: 6,
    },
    {
      id: '6',
      title: 'Rénovation des Plastiques Extérieurs',
      category: 'protection',
      description: 'Redonnez vie aux plastiques ternis et grisés de votre véhicule.',
      duration: '25 min',
      difficulty: 'Débutant',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      steps: 6,
    }
  ]

  const filteredTutorials = selectedCategory === 'all'
    ? tutorials
    : tutorials.filter(t => t.category === selectedCategory)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Débutant': return 'text-green-700 bg-green-100'
      case 'Intermédiaire': return 'text-amber-700 bg-amber-100'
      case 'Avancé': return 'text-red-700 bg-red-100'
      default: return 'text-dark-500 bg-sand-200'
    }
  }

  return (
    <>
      <SEOHead page="tutorials" />

      <div className="min-h-screen bg-sand-50 pt-[72px]">
        {/* Hero */}
        <div className="bg-white border-b border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">Guides & Tutoriels</span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mt-3 mb-6">
                Apprenez le Detailing<span className="text-primary-500">.</span>
              </h1>
              <p className="text-lg text-dark-500">
                Des techniques professionnelles expliquées étape par étape
              </p>
            </motion.div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white border-b border-sand-200 py-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/tutoriels/${tutorial.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-dark-900/20 to-transparent" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-dark-900 ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="flex items-center px-3 py-1 bg-white/90 backdrop-blur rounded-full text-dark-900 text-sm font-medium">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {tutorial.duration}
                      </span>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="absolute bottom-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(tutorial.difficulty)}`}>
                        {tutorial.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <span className="text-primary-500 text-xs font-semibold uppercase tracking-wider">
                      {categories.find(c => c.id === tutorial.category)?.name}
                    </span>
                    <h3 className="text-dark-900 font-bold text-lg mt-1 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-dark-500 text-sm line-clamp-2 mb-3">
                      {tutorial.description}
                    </p>
                    <div className="flex items-center text-dark-400 text-sm">
                      <BookOpen className="w-4 h-4 mr-1.5" />
                      {tutorial.steps} étapes
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-sand-100 text-dark-900 font-semibold rounded-full transition-all"
                >
                  Découvrir nos services
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
                <Link
                  to="/boutique"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 hover:border-white text-white font-semibold rounded-full transition-all"
                >
                  Voir les produits
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TutorialsV2
