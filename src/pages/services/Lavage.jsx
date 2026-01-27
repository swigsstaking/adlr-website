import ServicePage from '../ServicePage'

const LavageService = () => {
  const service = {
    title: 'Lavage Premium',
    subtitle: 'Un nettoyage minutieux intérieur et extérieur, des produits haut de gamme sélectionnés par nos experts, et une attention particulière aux moindres détails.',
    category: 'Nettoyage',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1920&auto=format&fit=crop',
    descriptionImage: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&auto=format&fit=crop',
    video: 'https://video.wixstatic.com/video/bf2329_97a02c74491e4e3b933761a5354c1870/720p/mp4/file.mp4',

    descriptionTitle: 'L\'art du lavage automobile',
    description: `Chez ADLR Cosmetic Auto, nous considérons le lavage comme la première étape essentielle de tout entretien automobile de qualité. Notre méthode des deux seaux, combinée à des produits pH neutres haut de gamme, garantit un nettoyage en profondeur sans jamais risquer d'endommager votre peinture.

Chaque véhicule reçoit une attention particulière, de la préparation initiale avec un pré-lavage à la mousse active, jusqu'au séchage minutieux avec des microfibres premium. Nous nettoyons chaque recoin, chaque interstice, pour un résultat impeccable.

Notre équipe prend soin de votre véhicule comme si c'était le nôtre, avec passion et expertise.`,

    features: [
      { title: 'Pré-lavage mousse active', description: 'Décolle les saletés sans contact' },
      { title: 'Méthode deux seaux', description: 'Évite les micro-rayures' },
      { title: 'Shampooing pH neutre', description: 'Respecte les traitements existants' },
      { title: 'Nettoyage jantes & pneus', description: 'Produits dédiés non acides' },
      { title: 'Séchage microfibre', description: 'Microfibres premium 400 GSM' },
      { title: 'Nettoyage vitres', description: 'Intérieur et extérieur sans traces' },
      { title: 'Aspiration complète', description: 'Sièges, moquettes, coffre' },
      { title: 'Nettoyage plastiques', description: 'Tableau de bord, contre-portes' },
      { title: 'Parfum intérieur', description: 'Fragrance premium au choix' },
    ],

    pricing: [
      {
        category: 'Citadine / Compacte',
        examples: 'Polo, Golf, A3, Classe A...',
        price: '80',
        duration: '1h30-2h',
      },
      {
        category: 'Berline / SUV',
        examples: '3 Series, C-Class, Q5, GLC...',
        price: '100',
        duration: '2h-2h30',
      },
      {
        category: 'Grand SUV / Van',
        examples: 'X5, GLE, Q7, Range Rover...',
        price: '120',
        duration: '2h30-3h',
      },
    ],

    otherServices: [
      { title: 'Polish', link: '/services/polish' },
      { title: 'Céramique', link: '/services/ceramique' },
      { title: 'Cire', link: '/services/cire' },
      { title: 'Tous les services', link: '/services' },
    ],
  }

  return <ServicePage service={service} seoPage="services" />
}

export default LavageService
