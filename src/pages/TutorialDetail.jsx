import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ChevronLeft, ChevronRight, CheckCircle, ShoppingBag, Play, BookOpen } from 'lucide-react'
import SEOHead from '../components/SEOHead'

const TutorialDetail = () => {
  const { id } = useParams()
  const [tutorial, setTutorial] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)

  const tutorials = [
    {
      id: '1',
      title: 'La Méthode des Deux Seaux',
      category: 'Lavage',
      description: 'La technique professionnelle pour laver votre voiture sans créer de micro-rayures. Apprenez à utiliser correctement deux seaux avec grilles pour un lavage sécurisé.',
      duration: '15 min',
      difficulty: 'Débutant',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1200',
      videoUrl: null,
      introduction: `Le lavage aux deux seaux est LA méthode professionnelle par excellence pour entretenir votre véhicule sans risquer d'abîmer la peinture. Cette technique simple mais efficace permet d'éviter les fameuses micro-rayures (swirls) qui ternissent l'éclat de votre carrosserie.

Le principe est simple : un seau contient l'eau savonneuse, l'autre l'eau de rinçage. La grille au fond de chaque seau retient les saletés pour qu'elles ne remontent pas sur votre gant de lavage.`,
      steps: [
        {
          title: 'Préparer les deux seaux',
          description: 'Placez une grille au fond de chaque seau. Remplissez le premier seau avec de l\'eau et votre shampoing auto (environ 30ml pour 10L d\'eau). Remplissez le second seau uniquement avec de l\'eau claire.',
          tip: 'Utilisez de l\'eau tiède pour une meilleure efficacité du shampoing.',
          image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800'
        },
        {
          title: 'Rincer le véhicule',
          description: 'Avant de toucher la carrosserie avec le gant, rincez abondamment le véhicule au jet ou au nettoyeur haute pression pour éliminer les plus grosses saletés.',
          tip: 'Commencez toujours par le toit et descendez progressivement.',
          image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800'
        },
        {
          title: 'Laver une section',
          description: 'Trempez votre gant dans le seau de shampoing, essorez légèrement et lavez une section du véhicule (par exemple le toit) avec des mouvements linéaires, jamais circulaires.',
          tip: 'Travaillez toujours du haut vers le bas, les parties basses étant les plus sales.',
          image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800'
        },
        {
          title: 'Rincer le gant',
          description: 'Après chaque section, plongez le gant dans le seau d\'eau claire et frottez-le contre la grille pour libérer les saletés. Les particules tombent au fond sous la grille.',
          tip: 'Ne passez jamais à la section suivante sans rincer le gant.',
          image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800'
        },
        {
          title: 'Recharger en shampoing',
          description: 'Replongez le gant propre dans le seau de shampoing et passez à la section suivante. Répétez le processus jusqu\'à avoir lavé tout le véhicule.',
          tip: 'Si l\'eau du seau de rinçage devient trop sale, changez-la.',
          image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800'
        },
        {
          title: 'Rinçage final et séchage',
          description: 'Rincez une dernière fois tout le véhicule puis séchez immédiatement avec une microfibre de qualité pour éviter les traces d\'eau.',
          tip: 'Utilisez une microfibre waffle weave pour un séchage optimal.',
          image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800'
        }
      ],
      products: [
        { id: '1', name: 'Shampoing pH Neutre Premium', price: 24.90 },
        { id: '5', name: 'Kit Microfibre Premium', price: 34.90 },
        { name: 'Kit 2 seaux + grilles', price: 49.90 },
      ],
      relatedTutorials: ['2', '3']
    },
    {
      id: '2',
      title: 'Décontamination à la Clay Bar',
      category: 'Lavage',
      description: 'Éliminez les contaminants incrustés dans votre peinture : goudron, résidus ferreux, pollution industrielle.',
      duration: '20 min',
      difficulty: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=1200',
      introduction: `La décontamination à la clay bar (ou barre d'argile) est une étape essentielle avant toute correction ou protection de la peinture. Elle permet d'éliminer les contaminants qui se sont incrustés dans le vernis et que le lavage seul ne peut pas retirer.

Ces contaminants incluent les retombées industrielles, le goudron, la sève d'arbre, les résidus de frein et la pollution atmosphérique.`,
      steps: [
        {
          title: 'Laver et sécher le véhicule',
          description: 'La clay bar ne s\'utilise jamais sur une carrosserie sale. Lavez d\'abord votre véhicule avec la méthode des deux seaux et séchez-le.',
          tip: 'Un véhicule propre permet à la clay de mieux glisser.',
          image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800'
        },
        {
          title: 'Préparer la clay bar',
          description: 'Malaxez la clay bar pour la réchauffer et l\'assouplir. Aplatissez-la en forme de galette qui tient dans la paume de votre main.',
          tip: 'Si la clay tombe par terre, jetez-la immédiatement !',
          image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800'
        },
        {
          title: 'Vaporiser le lubrifiant',
          description: 'Vaporisez généreusement le lubrifiant sur une section de 50x50cm. La surface doit être bien mouillée pour que la clay glisse.',
          tip: 'N\'hésitez pas à en remettre si ça commence à accrocher.',
          image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800'
        },
        {
          title: 'Passer la clay bar',
          description: 'Passez la clay bar en mouvements linéaires (avant-arrière) avec une légère pression. Vous sentirez la surface devenir de plus en plus lisse.',
          tip: 'Évitez les mouvements circulaires qui peuvent créer des marques.',
          image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800'
        },
        {
          title: 'Replier et continuer',
          description: 'Quand la surface de la clay est sale, repliez-la pour avoir une face propre. Continuez section par section sur tout le véhicule.',
          tip: 'Vérifiez régulièrement la clay et repliez-la souvent.',
          image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800'
        },
        {
          title: 'Essuyer et vérifier',
          description: 'Essuyez chaque section avec une microfibre propre. Passez votre main sur la carrosserie : elle doit être parfaitement lisse comme du verre.',
          tip: 'Si vous sentez encore des aspérités, repassez la clay.',
          image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800'
        }
      ],
      products: [
        { id: '6', name: 'Clay Bar Kit Décontamination', price: 39.90 },
        { name: 'Lubrifiant Clay 500ml', price: 14.90 },
        { id: '5', name: 'Kit Microfibre Premium', price: 34.90 },
      ],
      relatedTutorials: ['1', '3']
    },
    {
      id: '3',
      title: 'Polish Correctif : Éliminer les Micro-rayures',
      category: 'Polish',
      description: 'Guide complet pour corriger les défauts de peinture avec une polisseuse orbitale.',
      duration: '45 min',
      difficulty: 'Avancé',
      image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1200',
      introduction: `Le polish correctif est l'étape qui permet d'éliminer les défauts de peinture : micro-rayures (swirls), hologrammes, traces de polissage et rayures légères. C'est un travail qui demande de la patience et de la technique.

Cette opération abrase légèrement le vernis pour "niveler" la surface et supprimer les défauts. Elle doit être réalisée avant toute protection (cire ou céramique).`,
      steps: [
        {
          title: 'Évaluer l\'état de la peinture',
          description: 'Utilisez une lampe d\'inspection pour identifier les défauts : swirls, hologrammes, rayures. Cela déterminera le niveau de correction nécessaire.',
          tip: 'La lumière directe du soleil peut aussi révéler les défauts.',
          image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800'
        },
        {
          title: 'Choisir le bon duo pad/compound',
          description: 'Pour des défauts légers : pad de finition + polish léger. Pour des défauts modérés : pad de coupe + compound. Adaptez selon l\'état de la peinture.',
          tip: 'Commencez toujours par le moins agressif et augmentez si nécessaire.',
          image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800'
        },
        {
          title: 'Préparer la polisseuse',
          description: 'Fixez le pad sur la polisseuse orbitale. Appliquez 4-5 gouttes de compound sur le pad. Étalez à vitesse lente avant de commencer.',
          tip: 'Ne mettez jamais trop de produit, c\'est contre-productif.',
          image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800'
        },
        {
          title: 'Polir section par section',
          description: 'Travaillez sur des zones de 50x50cm maximum. Faites des passes croisées (horizontales puis verticales) à vitesse moyenne avec une pression légère.',
          tip: 'Laissez le poids de la machine faire le travail.',
          image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800'
        },
        {
          title: 'Contrôler le résultat',
          description: 'Essuyez les résidus avec une microfibre et vérifiez avec la lampe. Si des défauts persistent, faites une nouvelle passe.',
          tip: 'Attention à ne pas trop insister, vous pourriez percer le vernis.',
          image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800'
        },
        {
          title: 'Finition',
          description: 'Terminez avec un polish de finition et un pad doux pour éliminer les micro-marbrures laissées par la correction et obtenir une brillance maximale.',
          tip: 'Cette étape est indispensable avant d\'appliquer une protection.',
          image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800'
        }
      ],
      products: [
        { name: 'Polisseuse orbitale', price: 189.00 },
        { name: 'Set de pads (4 pcs)', price: 49.90 },
        { name: 'Compound correctif', price: 29.90 },
        { name: 'Polish finition', price: 34.90 },
      ],
      relatedTutorials: ['2', '4']
    },
    {
      id: '4',
      title: 'Application Protection Céramique',
      category: 'Protection',
      description: 'Comment appliquer correctement un coating céramique pour une protection longue durée.',
      duration: '60 min',
      difficulty: 'Avancé',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200',
      introduction: `Le coating céramique offre la meilleure protection possible pour votre carrosserie. Il crée une couche de protection dure (9H) qui résiste aux UV, aux produits chimiques et aux contaminants pendant 3 à 5 ans.

L'application demande une préparation minutieuse et une technique précise. Le moindre défaut sous le coating sera "figé" pour plusieurs années.`,
      steps: [
        {
          title: 'Préparer la surface',
          description: 'La carrosserie doit être parfaitement décontaminée et polie. Aucun défaut ne doit subsister car le coating va les figer.',
          tip: 'Cette étape représente 80% du résultat final.',
          image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'
        },
        {
          title: 'Dégraisser à l\'IPA',
          description: 'Vaporisez l\'IPA (alcool isopropylique) et essuyez avec une microfibre propre. Cela élimine les huiles et résidus de polish.',
          tip: 'Utilisez un mélange 50/50 IPA et eau déminéralisée.',
          image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'
        },
        {
          title: 'Préparer le coating',
          description: 'Enveloppez l\'applicateur suède autour du bloc. Appliquez quelques gouttes de coating sur l\'applicateur.',
          tip: 'Travaillez dans un endroit à l\'abri du soleil et de la poussière.',
          image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'
        },
        {
          title: 'Appliquer le coating',
          description: 'Étalez le produit en mouvements croisés sur une zone de 50x50cm. Assurez-vous d\'une couverture uniforme sans manque.',
          tip: 'Ne repassez pas sur une zone qui commence à sécher.',
          image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'
        },
        {
          title: 'Attendre le flash',
          description: 'Attendez 30 à 60 secondes que le produit "flash" (aspect arc-en-ciel ou mat). Le temps varie selon la température.',
          tip: 'Par temps chaud, le flash arrive plus vite.',
          image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'
        },
        {
          title: 'Buffer et vérifier',
          description: 'Buffez délicatement avec une microfibre ultra-douce jusqu\'à ce que la surface soit parfaitement lisse et brillante.',
          tip: 'Vérifiez sous différents angles pour détecter les traces.',
          image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'
        }
      ],
      products: [
        { id: '3', name: 'Coating Céramique 9H', price: 89.90 },
        { name: 'IPA Dégraissant 500ml', price: 14.90 },
        { name: 'Applicateur suède (5 pcs)', price: 9.90 },
        { id: '5', name: 'Kit Microfibre Premium', price: 34.90 },
      ],
      relatedTutorials: ['3', '5']
    },
    {
      id: '5',
      title: 'Nettoyage et Traitement Cuir',
      category: 'Intérieur',
      description: 'Entretenez et protégez vos sièges en cuir avec les bons produits et techniques.',
      duration: '30 min',
      difficulty: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200',
      introduction: `Le cuir automobile nécessite un entretien régulier pour conserver sa souplesse et son aspect neuf. Un cuir mal entretenu va se craqueler, se décolorer et vieillir prématurément.

Le nettoyage et la protection du cuir se font idéalement tous les 2-3 mois, ou plus fréquemment si le véhicule est très utilisé.`,
      steps: [
        {
          title: 'Aspirer les surfaces',
          description: 'Commencez par aspirer soigneusement les sièges et les interstices pour retirer poussières et débris.',
          tip: 'Utilisez une brosse douce pour déloger les saletés des coutures.',
          image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800'
        },
        {
          title: 'Appliquer le nettoyant',
          description: 'Vaporisez le nettoyant cuir directement sur une brosse à poils doux ou sur une microfibre, jamais directement sur le cuir.',
          tip: 'Testez d\'abord sur une zone peu visible.',
          image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800'
        },
        {
          title: 'Frotter délicatement',
          description: 'Frottez le cuir avec la brosse en mouvements circulaires sans appuyer trop fort. Insistez sur les zones tachées.',
          tip: 'Les zones de contact (assise, volant) nécessitent plus d\'attention.',
          image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800'
        },
        {
          title: 'Essuyer les résidus',
          description: 'Essuyez immédiatement avec une microfibre humide pour retirer le nettoyant et les saletés dissoutes.',
          tip: 'Changez de face de microfibre régulièrement.',
          image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800'
        },
        {
          title: 'Laisser sécher',
          description: 'Laissez le cuir sécher complètement pendant 10-15 minutes avant d\'appliquer le protecteur.',
          tip: 'Ouvrez les fenêtres pour accélérer le séchage.',
          image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800'
        },
        {
          title: 'Appliquer le protecteur',
          description: 'Appliquez la crème protectrice avec un applicateur mousse en fine couche uniforme. Laissez pénétrer 5 min puis buffez.',
          tip: 'N\'en mettez pas trop pour éviter l\'aspect gras.',
          image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800'
        }
      ],
      products: [
        { id: '4', name: 'Nettoyant Cuir Premium', price: 19.90 },
        { name: 'Crème protection cuir', price: 24.90 },
        { name: 'Brosse cuir souple', price: 12.90 },
      ],
      relatedTutorials: ['6', '1']
    },
    {
      id: '6',
      title: 'Rénovation des Plastiques Extérieurs',
      category: 'Protection',
      description: 'Redonnez vie aux plastiques ternis et grisés de votre véhicule.',
      duration: '25 min',
      difficulty: 'Débutant',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200',
      introduction: `Les plastiques extérieurs (pare-chocs, passages de roue, baguettes) ont tendance à grisonner avec le temps sous l'effet des UV. Cette décoloration donne un aspect vieilli au véhicule.

Heureusement, il est facile de leur redonner leur aspect d'origine avec les bons produits. Le résultat peut durer plusieurs mois.`,
      steps: [
        {
          title: 'Nettoyer les plastiques',
          description: 'Appliquez un nettoyant multi-surfaces (APC) sur les plastiques et frottez avec une brosse pour retirer toutes les saletés.',
          tip: 'Un bon nettoyage est essentiel pour l\'adhérence du produit.',
          image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
        },
        {
          title: 'Rincer et sécher',
          description: 'Rincez abondamment et séchez complètement les plastiques. Aucune trace d\'humidité ne doit rester.',
          tip: 'Utilisez un souffleur pour chasser l\'eau des interstices.',
          image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
        },
        {
          title: 'Préparer le rénovateur',
          description: 'Secouez bien le flacon de rénovateur. Si c\'est un gel, appliquez-le sur un applicateur ou pinceau mousse.',
          tip: 'Portez des gants, certains produits peuvent tacher les mains.',
          image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
        },
        {
          title: 'Appliquer le produit',
          description: 'Étalez le rénovateur uniformément sur le plastique en couche fine. Travaillez par petites sections.',
          tip: 'Évitez les coulures sur la carrosserie, essuyez immédiatement.',
          image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
        },
        {
          title: 'Laisser agir',
          description: 'Laissez le produit pénétrer pendant 5-10 minutes selon les instructions du fabricant.',
          tip: 'Ne laissez pas sécher au soleil direct.',
          image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
        },
        {
          title: 'Buffer l\'excédent',
          description: 'Essuyez l\'excédent de produit avec une microfibre propre pour un fini mat uniforme.',
          tip: 'Une deuxième couche peut être appliquée pour un noir plus intense.',
          image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
        }
      ],
      products: [
        { name: 'Rénovateur plastiques', price: 19.90 },
        { name: 'APC nettoyant multi-surfaces', price: 14.90 },
        { name: 'Pinceau applicateur', price: 7.90 },
      ],
      relatedTutorials: ['4', '5']
    }
  ]

  useEffect(() => {
    const found = tutorials.find(t => t.id === id)
    setTutorial(found || tutorials[0])
    setCurrentStep(0)
  }, [id])

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-white pt-[72px] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-dark-900 border-t-transparent rounded-full" />
      </div>
    )
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Débutant': return 'text-green-700 bg-green-100'
      case 'Intermédiaire': return 'text-amber-700 bg-amber-100'
      case 'Avancé': return 'text-red-700 bg-red-100'
      default: return 'text-dark-500 bg-sand-200'
    }
  }

  const relatedTuts = tutorial.relatedTutorials?.map(rid => tutorials.find(t => t.id === rid)).filter(Boolean) || []

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
              <Link to="/tutoriels" className="text-dark-500 hover:text-dark-900 flex items-center gap-1 flex-shrink-0">
                <ChevronLeft className="w-4 h-4" />
                <span>Tutoriels</span>
              </Link>
              <span className="text-dark-300 hidden sm:inline">/</span>
              <span className="text-dark-500 hidden sm:inline">{tutorial.category}</span>
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
                    {tutorial.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-primary-500 text-white rounded-full text-sm font-medium">
                    {tutorial.category}
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
                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-dark-600 text-lg leading-relaxed whitespace-pre-line">
                    {tutorial.introduction}
                  </p>
                </div>

                {/* Steps */}
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
                                {step.tip && (
                                  <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                                    <span className="text-amber-500 font-bold">💡</span>
                                    <p className="text-amber-800 text-sm">{step.tip}</p>
                                  </div>
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
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Products Card */}
                  <div className="bg-sand-50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ShoppingBag className="w-5 h-5 text-dark-900" />
                      <h3 className="font-bold text-dark-900">Produits nécessaires</h3>
                    </div>
                    <ul className="space-y-3 mb-4">
                      {tutorial.products.map((product, i) => (
                        <li key={i} className="flex items-center justify-between">
                          {product.id ? (
                            <Link to={`/boutique/${product.id}`} className="text-dark-700 hover:text-primary-600 transition-colors">
                              {product.name}
                            </Link>
                          ) : (
                            <span className="text-dark-700">{product.name}</span>
                          )}
                          <span className="text-dark-900 font-semibold">
                            CHF {product.price.toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t border-sand-300 mb-4">
                      <span className="text-dark-500">Total</span>
                      <span className="text-xl font-bold text-dark-900">
                        CHF {tutorial.products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                      </span>
                    </div>
                    <Link
                      to="/boutique"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dark-900 hover:bg-dark-800 text-white font-semibold rounded-xl transition-all"
                    >
                      Voir les produits
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Related Tutorials */}
                  {relatedTuts.length > 0 && (
                    <div className="bg-white rounded-2xl border border-sand-200 p-6">
                      <h3 className="font-bold text-dark-900 mb-4">Tutoriels similaires</h3>
                      <div className="space-y-3">
                        {relatedTuts.map((rel) => (
                          <Link
                            key={rel.id}
                            to={`/tutoriels/${rel.id}`}
                            className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-sand-50 transition-colors"
                          >
                            <img
                              src={rel.image}
                              alt={rel.title}
                              className="w-16 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-dark-900 font-medium text-sm line-clamp-1">{rel.title}</p>
                              <p className="text-dark-400 text-xs">{rel.duration}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
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
              to="/services"
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
