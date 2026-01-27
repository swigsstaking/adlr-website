import ServicePage from '../ServicePage'

const CireService = () => {
  const service = {
    title: 'Cire Premium',
    subtitle: 'Sublimez votre véhicule avec notre application de cire premium. Un résultat brillant pour révéler toute la profondeur de votre peinture.',
    category: 'Protection',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&auto=format&fit=crop',
    descriptionImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&auto=format&fit=crop',
    video: 'https://video.wixstatic.com/video/bf2329_5458ea175d88432caeed969df129eb8e/720p/mp4/file.mp4',

    descriptionTitle: 'L\'élégance de la cire naturelle',
    description: `La cire carnauba reste le choix privilégié des puristes pour sublimer leur véhicule. Issue du palmier brésilien, cette cire naturelle offre une brillance chaude et profonde que les protections synthétiques ne peuvent égaler.

Notre cire premium contient un taux élevé de carnauba pure, appliquée à la main par nos experts. Le résultat est une brillance incomparable qui met en valeur chaque courbe de votre carrosserie.

Bien que sa durabilité soit plus courte qu'une céramique (2-3 mois), la cire offre un rendu visuel unique et un rituel d'entretien apprécié des amateurs de belles automobiles.`,

    features: [
      { title: 'Lavage préalable', description: 'Préparation complète du véhicule' },
      { title: 'Décontamination', description: 'Clay bar pour surface lisse' },
      { title: 'Cire carnauba', description: 'Haute teneur en cire pure' },
      { title: 'Application manuelle', description: 'Pose à la main experte' },
      { title: 'Brillance chaude', description: 'Reflets profonds et naturels' },
      { title: 'Protection UV', description: 'Protection naturelle' },
      { title: 'Hydrophobie', description: 'Effet perlant modéré' },
      { title: 'Durée 2-3 mois', description: 'Réapplication recommandée' },
      { title: 'Entretien facile', description: 'Compatible tous shampoings' },
    ],

    pricing: [
      {
        category: 'Citadine / Compacte',
        examples: 'Polo, Golf, A3, Classe A...',
        price: '150',
        duration: '3-4h',
      },
      {
        category: 'Berline / SUV',
        examples: '3 Series, C-Class, Q5, GLC...',
        price: '200',
        duration: '4-5h',
      },
      {
        category: 'Grand SUV / Van',
        examples: 'X5, GLE, Q7, Range Rover...',
        price: '250',
        duration: '5-6h',
      },
    ],

    otherServices: [
      { title: 'Lavage', link: '/services/lavage' },
      { title: 'Polish', link: '/services/polish' },
      { title: 'Céramique', link: '/services/ceramique' },
      { title: 'Tous les services', link: '/services' },
    ],
  }

  return <ServicePage service={service} seoPage="services" />
}

export default CireService
