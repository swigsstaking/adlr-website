import ServicePage from '../ServicePage'

const CeramiqueService = () => {
  const service = {
    title: 'Protection Céramique',
    subtitle: 'Protégez votre investissement avec notre traitement céramique professionnel. Une barrière invisible haute performance contre les UV et la pollution.',
    category: 'Protection',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&auto=format&fit=crop',
    descriptionImage: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&auto=format&fit=crop',
    video: 'https://video.wixstatic.com/video/bf2329_89b93bd6dc05409fb7993b679512255e/720p/mp4/file.mp4',

    descriptionTitle: 'La protection ultime pour votre carrosserie',
    description: `Le traitement céramique représente le summum de la protection automobile. Cette technologie avancée crée une liaison chimique permanente avec votre peinture, formant une couche protectrice d'une dureté de 9H sur l'échelle de Mohs.

Notre céramique professionnelle offre une protection exceptionnelle contre les UV, la pollution, les fientes d'oiseaux, la résine d'arbre et les contaminants chimiques. L'effet hydrophobe extrême fait perler l'eau et facilite considérablement l'entretien quotidien.

Avant l'application, nous préparons minutieusement votre véhicule avec un polish correctif si nécessaire, garantissant un résultat impeccable sous la couche céramique.`,

    features: [
      { title: 'Préparation complète', description: 'Lavage, décontamination, polish' },
      { title: 'Céramique 9H', description: 'Dureté maximale professionnelle' },
      { title: 'Protection 3-5 ans', description: 'Durabilité garantie' },
      { title: 'Effet hydrophobe', description: 'L\'eau perle instantanément' },
      { title: 'Anti-UV', description: 'Protection contre la décoloration' },
      { title: 'Résistance chimique', description: 'Contre pollution et contaminants' },
      { title: 'Brillance intense', description: 'Effet miroir profond' },
      { title: 'Certificat', description: 'Certificat d\'authenticité fourni' },
      { title: 'Kit entretien', description: 'Produits d\'entretien offerts' },
    ],

    pricing: [
      {
        category: 'Citadine / Compacte',
        examples: 'Polo, Golf, A3, Classe A...',
        price: '800',
        duration: '2-3 jours',
      },
      {
        category: 'Berline / SUV',
        examples: '3 Series, C-Class, Q5, GLC...',
        price: '1000',
        duration: '2-3 jours',
      },
      {
        category: 'Grand SUV / Van',
        examples: 'X5, GLE, Q7, Range Rover...',
        price: '1300',
        duration: '3-4 jours',
      },
    ],

    otherServices: [
      { title: 'Lavage', link: '/services/lavage' },
      { title: 'Polish', link: '/services/polish' },
      { title: 'Cire', link: '/services/cire' },
      { title: 'Tous les services', link: '/services' },
    ],
  }

  return <ServicePage service={service} seoPage="services" />
}

export default CeramiqueService
