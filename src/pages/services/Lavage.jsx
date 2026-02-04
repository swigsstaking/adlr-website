import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ServicePage from '../ServicePage'

const LavageService = () => {
  const { lang } = useParams()
  const { t } = useTranslation('services')

  // Get translated content
  const serviceData = t('servicePages.lavage', { returnObjects: true })
  const vehicleCategories = t('servicePages.vehicleCategories', { returnObjects: true })
  const common = t('servicePages.common', { returnObjects: true })

  const service = {
    title: serviceData.title,
    subtitle: serviceData.subtitle,
    category: serviceData.category,
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1920&auto=format&fit=crop',
    descriptionImage: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&auto=format&fit=crop',
    video: 'https://video.wixstatic.com/video/bf2329_97a02c74491e4e3b933761a5354c1870/720p/mp4/file.mp4',

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
      { title: t('servicePages.polish.title'), link: '/services/polish' },
      { title: t('servicePages.ceramique.title'), link: '/services/ceramique' },
      { title: t('servicePages.cire.title'), link: '/services/cire' },
      { title: common.allServices, link: '/services' },
    ],
  }

  return <ServicePage service={service} seoPage="services" />
}

export default LavageService
