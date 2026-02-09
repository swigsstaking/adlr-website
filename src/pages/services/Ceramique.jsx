import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ServicePage from '../ServicePage'

const CeramiqueService = () => {
  const { lang } = useParams()
  const { t } = useTranslation('services')

  // Get translated content
  const serviceData = t('servicePages.ceramique', { returnObjects: true })
  const vehicleCategories = t('servicePages.vehicleCategories', { returnObjects: true })
  const common = t('servicePages.common', { returnObjects: true })

  const service = {
    title: serviceData.title,
    subtitle: serviceData.subtitle,
    category: serviceData.category,
    image: 'https://swigs.online/uploads/adlr/1769941983987-685841551.webp',
    heroImage: 'https://swigs.online/uploads/adlr/1769941983987-685841551.webp',
    descriptionImage: 'https://swigs.online/uploads/adlr/1769941983987-685841551.webp',
    video: 'https://swigs.online/uploads/adlr/1770455314751-364132429.webm',

    descriptionTitle: serviceData.descriptionTitle,
    description: serviceData.description,

    features: serviceData.features,

    pricing: [
      {
        category: vehicleCategories.compact,
        examples: vehicleCategories.compactExamples,
        price: serviceData.pricing[0].price,
        duration: serviceData.pricing[0].duration,
      },
      {
        category: vehicleCategories.sedan,
        examples: vehicleCategories.sedanExamples,
        price: serviceData.pricing[1].price,
        duration: serviceData.pricing[1].duration,
      },
      {
        category: vehicleCategories.large,
        examples: vehicleCategories.largeExamples,
        price: serviceData.pricing[2].price,
        duration: serviceData.pricing[2].duration,
      },
    ],

    otherServices: [
      { title: t('servicePages.lavage.title'), link: '/services/lavage' },
      { title: t('servicePages.polish.title'), link: '/services/polish' },
      { title: t('servicePages.cire.title'), link: '/services/cire' },
      { title: common.allServices, link: '/services' },
    ],
  }

  return <ServicePage service={service} seoPage="services" />
}

export default CeramiqueService
