import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ServicePage from '../ServicePage'

const CireService = () => {
  const { lang } = useParams()
  const { t } = useTranslation('services')

  // Get translated content
  const serviceData = t('servicePages.cire', { returnObjects: true })
  const vehicleCategories = t('servicePages.vehicleCategories', { returnObjects: true })
  const common = t('servicePages.common', { returnObjects: true })

  const service = {
    title: serviceData.title,
    subtitle: serviceData.subtitle,
    category: serviceData.category,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&auto=format&fit=crop',
    descriptionImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&auto=format&fit=crop',
    video: 'https://video.wixstatic.com/video/bf2329_5458ea175d88432caeed969df129eb8e/720p/mp4/file.mp4',

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
      { title: t('servicePages.ceramique.title'), link: '/services/ceramique' },
      { title: common.allServices, link: '/services' },
    ],
  }

  return <ServicePage service={service} seoPage="services" />
}

export default CireService
