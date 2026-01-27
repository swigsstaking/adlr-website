import ServicePage from '../ServicePage'

const PolishService = () => {
  const service = {
    title: 'Polish Correctif',
    subtitle: 'Offrez à votre voiture un éclat incomparable. Nous utilisons des techniques professionnelles pour éliminer micro-rayures, swirls et hologrammes.',
    category: 'Correction',
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1920&auto=format&fit=crop',
    descriptionImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&auto=format&fit=crop',
    video: 'https://video.wixstatic.com/video/bf2329_89210701a0a74d41854ab173902a0583/720p/mp4/file.mp4',

    descriptionTitle: 'La correction de peinture professionnelle',
    description: `Le polish correctif est l'art de redonner à votre peinture son éclat d'origine en éliminant les défauts de surface. Micro-rayures, swirls (tourbillons), hologrammes et autres marques disgracieuses disparaissent sous nos machines professionnelles.

Notre processus commence par une analyse approfondie de l'état de votre peinture à l'aide de lampes spéciales. Nous déterminons ensuite le niveau de correction nécessaire et sélectionnons les pads et compounds adaptés.

Chaque passage de polisseuse est effectué avec précision, section par section, pour un résultat homogène et durable. Le polish correctif révèle toute la profondeur et la brillance de votre peinture.`,

    features: [
      { title: 'Analyse peinture', description: 'Évaluation à la lampe LED/halogène' },
      { title: 'Décontamination', description: 'Clay bar et dégraissage complet' },
      { title: 'Polish multi-passes', description: '2 à 3 passes selon les défauts' },
      { title: 'Élimination swirls', description: 'Suppression des tourbillons' },
      { title: 'Correction hologrammes', description: 'Finition parfaite' },
      { title: 'Polisseuse orbitale', description: 'Machines professionnelles Rupes' },
      { title: 'Compounds premium', description: 'Menzerna, Sonax, Koch Chemie' },
      { title: 'Contrôle final', description: 'Vérification sous différents éclairages' },
      { title: 'Protection incluse', description: 'Cire de finition 3 mois' },
    ],

    pricing: [
      {
        category: 'Citadine / Compacte',
        examples: 'Polo, Golf, A3, Classe A...',
        price: '350',
        duration: '1 jour',
      },
      {
        category: 'Berline / SUV',
        examples: '3 Series, C-Class, Q5, GLC...',
        price: '450',
        duration: '1-1.5 jours',
      },
      {
        category: 'Grand SUV / Van',
        examples: 'X5, GLE, Q7, Range Rover...',
        price: '550',
        duration: '1.5-2 jours',
      },
    ],

    otherServices: [
      { title: 'Lavage', link: '/services/lavage' },
      { title: 'Céramique', link: '/services/ceramique' },
      { title: 'Cire', link: '/services/cire' },
      { title: 'Tous les services', link: '/services' },
    ],
  }

  return <ServicePage service={service} seoPage="services" />
}

export default PolishService
