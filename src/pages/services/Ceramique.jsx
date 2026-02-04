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
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&auto=format&fit=crop',
    descriptionImage: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&auto=format&fit=crop',
    video: 'https://video.wixstatic.com/video/bf2329_89b93bd6dc05409fb7993b679512255e/720p/mp4/file.mp4',

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
