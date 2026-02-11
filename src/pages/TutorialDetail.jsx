import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ChevronLeft, ChevronRight, CheckCircle, ShoppingBag, ShoppingCart, Loader2, Check } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { useCart } from '../context/CartContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const TutorialDetail = () => {
  const { id, lang } = useParams()
  const [tutorial, setTutorial] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [productsAdded, setProductsAdded] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const { addToCart } = useCart()

  // Données de fallback
  const fallbackTutorials = [
    {
      id: '1',
      slug: 'methode-deux-seaux',
      title: 'La Méthode des Deux Seaux',
      category: 'lavage',
      description: 'La technique professionnelle pour laver votre voiture sans créer de micro-rayures.',
      duration: '15 min',
      difficulty: 'debutant',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1200',
      introduction: `Le lavage aux deux seaux est LA méthode professionnelle par excellence pour entretenir votre véhicule sans risquer d'abîmer la peinture. Cette technique simple mais efficace permet d'éviter les fameuses micro-rayures (swirls) qui ternissent l'éclat de votre carrosserie.

Le principe est simple : un seau contient l'eau savonneuse, l'autre l'eau de rinçage. La grille au fond de chaque seau retient les saletés pour qu'elles ne remontent pas sur votre gant de lavage.`,
      steps: [
        {
          title: 'Préparer les deux seaux',
          description: 'Placez une grille au fond de chaque seau. Remplissez le premier seau avec de l\'eau et votre shampoing auto.',
          tips: 'Utilisez de l\'eau tiède pour une meilleure efficacité du shampoing.',
        },
        {
          title: 'Rincer le véhicule',
          description: 'Avant de toucher la carrosserie avec le gant, rincez abondamment le véhicule au jet.',
          tips: 'Commencez toujours par le toit et descendez progressivement.',
        },
        {
          title: 'Laver une section',
          description: 'Trempez votre gant dans le seau de shampoing et lavez une section du véhicule avec des mouvements linéaires.',
          tips: 'Travaillez toujours du haut vers le bas.',
        },
        {
          title: 'Rincer le gant',
          description: 'Après chaque section, plongez le gant dans le seau d\'eau claire et frottez-le contre la grille.',
          tips: 'Ne passez jamais à la section suivante sans rincer le gant.',
        },
        {
          title: 'Recharger en shampoing',
          description: 'Replongez le gant propre dans le seau de shampoing et passez à la section suivante.',
          tips: 'Si l\'eau du seau de rinçage devient trop sale, changez-la.',
        },
        {
          title: 'Rinçage final et séchage',
          description: 'Rincez une dernière fois tout le véhicule puis séchez immédiatement avec une microfibre.',
          tips: 'Utilisez une microfibre waffle weave pour un séchage optimal.',
        }
      ],
      products: [
        { name: 'Shampoing pH Neutre Premium', link: '/boutique', price: 24.90 },
        { name: 'Kit Microfibre Premium', link: '/boutique', price: 34.90 },
        { name: 'Kit 2 seaux + grilles', link: '/boutique', price: 49.90 },
      ],
    },
    {
      id: '2',
      slug: 'decontamination-clay-bar',
      title: 'Décontamination à la Clay Bar',
      category: 'lavage',
      description: 'Éliminez les contaminants incrustés dans votre peinture.',
      duration: '20 min',
      difficulty: 'intermediaire',
      image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=1200',
      introduction: `La décontamination à la clay bar est une étape essentielle avant toute correction ou protection de la peinture. Elle permet d'éliminer les contaminants qui se sont incrustés dans le vernis.

Ces contaminants incluent les retombées industrielles, le goudron, la sève d'arbre et la pollution atmosphérique.`,
      steps: [
        { title: 'Laver et sécher le véhicule', description: 'La clay bar ne s\'utilise jamais sur une carrosserie sale.', tips: 'Un véhicule propre permet à la clay de mieux glisser.' },
        { title: 'Préparer la clay bar', description: 'Malaxez la clay bar pour la réchauffer.', tips: 'Si la clay tombe par terre, jetez-la immédiatement !' },
        { title: 'Vaporiser le lubrifiant', description: 'Vaporisez généreusement le lubrifiant sur une section de 50x50cm.', tips: 'N\'hésitez pas à en remettre si ça commence à accrocher.' },
        { title: 'Passer la clay bar', description: 'Passez la clay bar en mouvements linéaires avec une légère pression.', tips: 'Évitez les mouvements circulaires.' },
        { title: 'Replier et continuer', description: 'Quand la surface de la clay est sale, repliez-la pour avoir une face propre.', tips: 'Vérifiez régulièrement la clay et repliez-la souvent.' },
        { title: 'Essuyer et vérifier', description: 'Essuyez chaque section avec une microfibre propre.', tips: 'Si vous sentez encore des aspérités, repassez la clay.' }
      ],
      products: [
        { name: 'Clay Bar Kit Décontamination', link: '/boutique', price: 29.90 },
        { name: 'Lubrifiant Clay 500ml', link: '/boutique', price: 19.90 },
        { name: 'Kit Microfibre Premium', link: '/boutique', price: 34.90 },
      ],
    },
    {
      id: '3',
      slug: 'polish-correctif',
      title: 'Polish Correctif : Éliminer les Micro-rayures',
      category: 'polish',
      description: 'Guide complet pour corriger les défauts de peinture avec une polisseuse orbitale.',
      duration: '45 min',
      difficulty: 'avance',
      image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1200',
      introduction: `Le polish correctif permet d'éliminer les défauts de peinture : micro-rayures, hologrammes et rayures légères. C'est un travail qui demande de la patience et de la technique.

Cette opération doit être réalisée avant toute protection (cire ou céramique).`,
      steps: [
        { title: 'Évaluer l\'état de la peinture', description: 'Utilisez une lampe d\'inspection pour identifier les défauts.', tips: 'La lumière directe du soleil peut aussi révéler les défauts.' },
        { title: 'Choisir le bon duo pad/compound', description: 'Adaptez selon l\'état de la peinture.', tips: 'Commencez toujours par le moins agressif.' },
        { title: 'Préparer la polisseuse', description: 'Fixez le pad et appliquez le compound.', tips: 'Ne mettez jamais trop de produit.' },
        { title: 'Polir section par section', description: 'Travaillez sur des zones de 50x50cm maximum.', tips: 'Laissez le poids de la machine faire le travail.' },
        { title: 'Contrôler le résultat', description: 'Essuyez les résidus et vérifiez avec la lampe.', tips: 'Attention à ne pas trop insister.' },
        { title: 'Finition', description: 'Terminez avec un polish de finition.', tips: 'Indispensable avant d\'appliquer une protection.' }
      ],
      products: [
        { name: 'Polisseuse orbitale', link: '/boutique', price: 289.00 },
        { name: 'Set de pads (4 pcs)', link: '/boutique', price: 39.90 },
        { name: 'Compound correctif', link: '/boutique', price: 29.90 },
        { name: 'Polish finition', link: '/boutique', price: 27.90 },
      ],
    },
    {
      id: '4',
      slug: 'application-ceramique',
      title: 'Application Protection Céramique',
      category: 'ceramique',
      description: 'Comment appliquer correctement un coating céramique pour une protection longue durée.',
      duration: '60 min',
      difficulty: 'avance',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200',
      introduction: `Le coating céramique offre la meilleure protection possible pour votre carrosserie. Il crée une couche de protection dure qui résiste pendant 3 à 5 ans.

L'application demande une préparation minutieuse et une technique précise.`,
      steps: [
        { title: 'Préparer la surface', description: 'La carrosserie doit être parfaitement décontaminée et polie.', tips: 'Cette étape représente 80% du résultat final.' },
        { title: 'Dégraisser à l\'IPA', description: 'Vaporisez l\'IPA et essuyez avec une microfibre propre.', tips: 'Utilisez un mélange 50/50 IPA et eau déminéralisée.' },
        { title: 'Préparer le coating', description: 'Enveloppez l\'applicateur et appliquez quelques gouttes.', tips: 'Travaillez dans un endroit à l\'abri du soleil.' },
        { title: 'Appliquer le coating', description: 'Étalez le produit en mouvements croisés.', tips: 'Ne repassez pas sur une zone qui commence à sécher.' },
        { title: 'Attendre le flash', description: 'Attendez 30 à 60 secondes que le produit "flash".', tips: 'Par temps chaud, le flash arrive plus vite.' },
        { title: 'Buffer et vérifier', description: 'Buffez délicatement avec une microfibre ultra-douce.', tips: 'Vérifiez sous différents angles.' }
      ],
      products: [
        { name: 'Coating Céramique 9H', link: '/boutique', price: 89.90 },
        { name: 'IPA Dégraissant 500ml', link: '/boutique', price: 14.90 },
        { name: 'Applicateur suède (5 pcs)', link: '/boutique', price: 12.90 },
        { name: 'Kit Microfibre Premium', link: '/boutique', price: 34.90 },
      ],
    },
    {
      id: '5',
      slug: 'nettoyage-cuir',
      title: 'Nettoyage et Traitement Cuir',
      category: 'interieur',
      description: 'Entretenez et protégez vos sièges en cuir avec les bons produits et techniques.',
      duration: '30 min',
      difficulty: 'intermediaire',
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200',
      introduction: `Le cuir automobile nécessite un entretien régulier pour conserver sa souplesse et son aspect neuf.

Le nettoyage et la protection du cuir se font idéalement tous les 2-3 mois.`,
      steps: [
        { title: 'Aspirer les surfaces', description: 'Commencez par aspirer soigneusement les sièges.', tips: 'Utilisez une brosse douce pour déloger les saletés.' },
        { title: 'Appliquer le nettoyant', description: 'Vaporisez le nettoyant cuir sur une microfibre.', tips: 'Testez d\'abord sur une zone peu visible.' },
        { title: 'Frotter délicatement', description: 'Frottez le cuir avec la brosse en mouvements circulaires.', tips: 'Les zones de contact nécessitent plus d\'attention.' },
        { title: 'Essuyer les résidus', description: 'Essuyez avec une microfibre humide.', tips: 'Changez de face de microfibre régulièrement.' },
        { title: 'Laisser sécher', description: 'Laissez le cuir sécher complètement pendant 10-15 minutes.', tips: 'Ouvrez les fenêtres pour accélérer le séchage.' },
        { title: 'Appliquer le protecteur', description: 'Appliquez la crème protectrice en fine couche.', tips: 'N\'en mettez pas trop pour éviter l\'aspect gras.' }
      ],
      products: [
        { name: 'Nettoyant Cuir Premium', link: '/boutique', price: 22.90 },
        { name: 'Crème protection cuir', link: '/boutique', price: 24.90 },
        { name: 'Brosse cuir souple', link: '/boutique', price: 14.90 },
      ],
    },
    {
      id: '6',
      slug: 'renovation-plastiques',
      title: 'Rénovation des Plastiques Extérieurs',
      category: 'cire',
      description: 'Redonnez vie aux plastiques ternis et grisés de votre véhicule.',
      duration: '25 min',
      difficulty: 'debutant',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200',
      introduction: `Les plastiques extérieurs ont tendance à grisonner avec le temps sous l'effet des UV. Cette décoloration donne un aspect vieilli au véhicule.

Heureusement, il est facile de leur redonner leur aspect d'origine.`,
      steps: [
        { title: 'Nettoyer les plastiques', description: 'Appliquez un nettoyant multi-surfaces sur les plastiques.', tips: 'Un bon nettoyage est essentiel pour l\'adhérence.' },
        { title: 'Rincer et sécher', description: 'Rincez abondamment et séchez complètement.', tips: 'Utilisez un souffleur pour chasser l\'eau.' },
        { title: 'Préparer le rénovateur', description: 'Secouez bien le flacon de rénovateur.', tips: 'Portez des gants.' },
        { title: 'Appliquer le produit', description: 'Étalez le rénovateur uniformément en couche fine.', tips: 'Évitez les coulures sur la carrosserie.' },
        { title: 'Laisser agir', description: 'Laissez le produit pénétrer pendant 5-10 minutes.', tips: 'Ne laissez pas sécher au soleil direct.' },
        { title: 'Buffer l\'excédent', description: 'Essuyez l\'excédent de produit avec une microfibre propre.', tips: 'Une deuxième couche peut être appliquée.' }
      ],
      products: [
        { name: 'Rénovateur plastiques', link: '/boutique', price: 19.90 },
        { name: 'APC nettoyant multi-surfaces', link: '/boutique', price: 16.90 },
        { name: 'Pinceau applicateur', link: '/boutique', price: 9.90 },
      ],
    }
  ]

  // Enrich products with prices from the product API
  const enrichProductsWithPrices = async (tutorialData) => {
    if (!tutorialData.products || tutorialData.products.length === 0) return tutorialData
    const enrichedProducts = await Promise.all(
      tutorialData.products.map(async (product) => {
        if (product.productId && !product.price) {
          try {
            const res = await fetch(`${API_URL}/products/public/${product.productId}?siteId=adlr`)
            const d = await res.json()
            if (d.success && d.data) {
              let price = d.data.price?.amount
              // Try matching variant by name for correct variant price
              if (d.data.variants?.length > 0) {
                const match = d.data.variants.find(v => product.name && v.name && product.name.includes(v.name))
                if (match?.price != null) price = match.price
              }
              if (price != null) return { ...product, price }
            }
          } catch (err) { /* ignore */ }
        }
        return product
      })
    )
    return { ...tutorialData, products: enrichedProducts }
  }

  useEffect(() => {
    const fetchTutorial = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL}/public/tutorials/${id}`)
        if (!response.ok) throw new Error('Not found')
        const data = await response.json()
        if (data.success && data.data) {
          const enriched = await enrichProductsWithPrices(data.data)
          setTutorial(enriched)
        } else {
          throw new Error('No data')
        }
      } catch (err) {
        console.error('Erreur chargement tutoriel:', err)
        // Fallback - chercher dans les données locales
        const found = fallbackTutorials.find(t => t.id === id || t.slug === id)
        setTutorial(found || fallbackTutorials[0])
      } finally {
        setLoading(false)
      }
    }

    fetchTutorial()
    setCurrentStep(0)
    setProductsAdded(false)
  }, [id])

  const handleAddAllToCart = async () => {
    if (!tutorial?.products || tutorial.products.length === 0) return

    setAddingToCart(true)

    // Fetch product details for each product that has a productId
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

    setAddingToCart(false)
    setProductsAdded(true)
    setTimeout(() => setProductsAdded(false), 2000)
  }

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      'debutant': 'Débutant',
      'intermediaire': 'Intermédiaire',
      'avance': 'Avancé'
    }
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

  const getCategoryLabel = (category) => {
    const labels = {
      'lavage': 'Lavage',
      'polish': 'Polish',
      'ceramique': 'Céramique',
      'cire': 'Cire',
      'interieur': 'Intérieur'
    }
    return labels[category] || category
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-[72px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-dark-900 animate-spin" />
      </div>
    )
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-white pt-[72px] flex flex-col items-center justify-center">
        <p className="text-dark-500 mb-4">Tutoriel non trouvé</p>
        <Link to={`/${lang}/tutoriels`} className="text-primary-600 hover:underline">
          Retour aux tutoriels
        </Link>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={`${tutorial.title} | Tutoriels ADLR`}
        description={tutorial.description}
      />

      <div className="min-h-screen bg-white pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <div className="bg-sand-50 border-b border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to={`/${lang}/tutoriels`} className="text-dark-500 hover:text-dark-900 flex items-center gap-1 flex-shrink-0">
                <ChevronLeft className="w-4 h-4" />
                <span>Tutoriels</span>
              </Link>
              <span className="text-dark-300 hidden sm:inline">/</span>
              <span className="text-dark-500 hidden sm:inline capitalize">{getCategoryLabel(tutorial.category)}</span>
              <span className="text-dark-300 hidden sm:inline">/</span>
              <span className="text-dark-900 font-medium truncate">{tutorial.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative">
          <div className="aspect-[21/9] md:aspect-[3/1] relative overflow-hidden">
            <img
              src={tutorial.image}
              alt={tutorial.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="flex items-center px-3 py-1 bg-white/90 backdrop-blur rounded-full text-dark-900 text-sm font-medium">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {tutorial.duration}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(tutorial.difficulty)}`}>
                    {getDifficultyLabel(tutorial.difficulty)}
                  </span>
                  <span className="px-3 py-1 bg-primary-500 text-white rounded-full text-sm font-medium capitalize">
                    {getCategoryLabel(tutorial.category)}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
                  {tutorial.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Introduction */}
                {tutorial.introduction && (
                  <div className="prose prose-lg max-w-none mb-12">
                    <p className="text-dark-600 text-lg leading-relaxed whitespace-pre-line">
                      {tutorial.introduction}
                    </p>
                  </div>
                )}

                {/* Steps */}
                {tutorial.steps && tutorial.steps.length > 0 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-display font-bold text-dark-900">
                      Les étapes
                    </h2>

                    {tutorial.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`rounded-2xl border-2 transition-all ${
                          currentStep === index ? 'border-primary-500 bg-primary-50' : 'border-sand-200 bg-white'
                        }`}
                      >
                        <button
                          onClick={() => setCurrentStep(currentStep === index ? -1 : index)}
                          className="w-full p-6 text-left"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              currentStep === index ? 'bg-primary-500 text-white' : 'bg-dark-900 text-white'
                            }`}>
                              <span className="font-bold">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-dark-900">{step.title}</h3>
                              {currentStep === index && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="mt-4"
                                >
                                  <p className="text-dark-600 mb-4">{step.description}</p>
                                  {step.tips && (
                                    <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                                      <span className="text-amber-500 font-bold">💡</span>
                                      <p className="text-amber-800 text-sm">{step.tips}</p>
                                    </div>
                                  )}
                                  {step.image && (
                                    <img src={step.image} alt={step.title} className="mt-4 rounded-lg w-full max-w-md" />
                                  )}
                                </motion.div>
                              )}
                            </div>
                            <ChevronRight className={`w-5 h-5 text-dark-400 transition-transform ${currentStep === index ? 'rotate-90' : ''}`} />
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Products Card */}
                  {tutorial.products && tutorial.products.length > 0 && (() => {
                    const total = tutorial.products.reduce((sum, p) => {
                      const qty = p.quantity || 1
                      return sum + (p.price ? p.price * qty : 0)
                    }, 0)
                    const hasAnyPrice = tutorial.products.some(p => p.price)

                    return (
                      <div className="bg-sand-50 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <ShoppingBag className="w-5 h-5 text-dark-900" />
                          <h3 className="font-bold text-dark-900">Produits nécessaires</h3>
                        </div>
                        <ul className="space-y-3 mb-4">
                          {tutorial.products.map((product, i) => (
                            <li key={i} className="flex items-center justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                {product.link ? (
                                  <Link to={product.link} className="text-dark-700 hover:text-primary-600 transition-colors text-sm">
                                    {product.quantity && product.quantity > 1 ? `${product.quantity}x ` : ''}{product.name}
                                  </Link>
                                ) : (
                                  <span className="text-dark-700 text-sm">
                                    {product.quantity && product.quantity > 1 ? `${product.quantity}x ` : ''}{product.name}
                                  </span>
                                )}
                              </div>
                              {product.price && (
                                <span className="text-dark-900 font-semibold text-sm flex-shrink-0">
                                  CHF {(product.price * (product.quantity || 1)).toFixed(2)}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>

                        {/* Total */}
                        {hasAnyPrice && (
                          <div className="flex items-center justify-between pt-3 mb-4 border-t border-sand-300">
                            <span className="font-bold text-dark-900">Total</span>
                            <span className="text-lg font-bold text-dark-900">CHF {total.toFixed(2)}</span>
                          </div>
                        )}

                        <button
                          onClick={handleAddAllToCart}
                          disabled={addingToCart}
                          className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl transition-all ${
                            productsAdded
                              ? 'bg-green-600 text-white'
                              : 'bg-dark-900 hover:bg-dark-800 text-white'
                          }`}
                        >
                          {addingToCart ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Ajout en cours...
                            </>
                          ) : productsAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              Ajouté au panier !
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              Ajouter tout au panier
                            </>
                          )}
                        </button>
                      </div>
                    )
                  })()}

                  {/* Back to tutorials */}
                  <div className="bg-white rounded-2xl border border-sand-200 p-6">
                    <h3 className="font-bold text-dark-900 mb-4">Autres tutoriels</h3>
                    <Link
                      to={`/${lang}/tutoriels`}
                      className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Voir tous les tutoriels
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-sand-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-display font-bold text-dark-900 mb-4">
              Préférez confier cette tâche à des pros ?
            </h2>
            <p className="text-dark-500 mb-6">
              Nos experts réalisent cette prestation avec un savoir-faire professionnel
            </p>
            <Link
              to={`/${lang}/services`}
              className="inline-flex items-center px-6 py-3 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-full transition-all"
            >
              Découvrir nos services
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default TutorialDetail
