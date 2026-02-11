import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ServicePage from '../ServicePage'

const PolishService = () => {
  const { lang } = useParams()
  const { t } = useTranslation('services')

  const serviceData = t('servicePages.polish', { returnObjects: true })
  const vehicleCategories = t('servicePages.vehicleCategories', { returnObjects: true })
  const common = t('servicePages.common', { returnObjects: true })

  const service = {
    title: serviceData.title,
    subtitle: serviceData.subtitle,
    category: serviceData.category,
    image: 'https://swigs.online/uploads/adlr/1769941990089-62374511.webp',
    heroImage: 'https://swigs.online/uploads/adlr/1769941990089-62374511.webp',
    descriptionImage: 'https://swigs.online/uploads/adlr/1769941990089-62374511.webp',
    video: 'https://swigs.online/uploads/adlr/1770457766809-323124336.webm',

    descriptionTitle: serviceData.descriptionTitle,
    description: serviceData.description,

    features: serviceData.features,

    pricing: [
      {
        category: vehicleCategories.compact,
        examples: vehicleCategories.compactExamples,
        price: serviceData.pricing[0].price,
        priceMax: serviceData.pricing[0].priceMax,
        duration: serviceData.pricing[0].duration,
      },
      {
        category: vehicleCategories.coupe,
        examples: vehicleCategories.coupeExamples,
        price: serviceData.pricing[1].price,
        priceMax: serviceData.pricing[1].priceMax,
        duration: serviceData.pricing[1].duration,
      },
      {
        category: vehicleCategories.berline,
        examples: vehicleCategories.berlineExamples,
        price: serviceData.pricing[2].price,
        priceMax: serviceData.pricing[2].priceMax,
        duration: serviceData.pricing[2].duration,
      },
      {
        category: vehicleCategories.monospace,
        examples: vehicleCategories.monospaceExamples,
        price: serviceData.pricing[3].price,
        priceMax: serviceData.pricing[3].priceMax,
        duration: serviceData.pricing[3].duration,
      },
    ],

    priceNote: serviceData.priceNote,

    otherServices: [
      { title: t('servicePages.lavage.title'), link: '/services/lavage' },
      { title: t('servicePages.ceramique.title'), link: '/services/ceramique' },
      { title: t('servicePages.cire.title'), link: '/services/cire' },
      { title: common.allServices, link: '/services' },
    ],
  }

  return <ServicePage service={service} seoPage="services" />
}

export default PolishService
