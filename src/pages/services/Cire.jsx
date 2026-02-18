import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ServicePage from '../ServicePage'

const CireService = () => {
  const { lang } = useParams()
  const { t } = useTranslation('services')

  const serviceData = t('servicePages.cire', { returnObjects: true })
  const vehicleCategories = t('servicePages.vehicleCategories', { returnObjects: true })
  const common = t('servicePages.common', { returnObjects: true })

  const service = {
    title: serviceData.title,
    subtitle: serviceData.subtitle,
    category: serviceData.category,
    image: 'https://swigs.online/uploads/adlr/1769941996725-183777827.webp',
    heroImage: 'https://swigs.online/uploads/adlr/1769941996725-183777827.webp',
    descriptionImage: 'https://swigs.online/uploads/adlr/1769941996725-183777827.webp',
    video: 'https://swigs.online/uploads/adlr/1770457758251-787538743.webm',

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
        category: vehicleCategories.coupe,
        examples: vehicleCategories.coupeExamples,
        price: serviceData.pricing[1].price,
        duration: serviceData.pricing[1].duration,
      },
      {
        category: vehicleCategories.berline,
        examples: vehicleCategories.berlineExamples,
        price: serviceData.pricing[2].price,
        duration: serviceData.pricing[2].duration,
      },
      {
        category: vehicleCategories.monospace,
        examples: vehicleCategories.monospaceExamples,
        price: serviceData.pricing[3].price,
        duration: serviceData.pricing[3].duration,
      },
    ],

    otherServices: [
      { title: t('servicePages.lavage.title'), link: '/services/lavage' },
      { title: t('servicePages.polish.title'), link: '/services/polish' },
      { title: t('servicePages.ceramique.title'), link: '/services/ceramique' },
      { title: common.allServices, link: '/services' },
    ],
  }

  return <ServicePage service={service} seoPage="services/cire" />
}

export default CireService
