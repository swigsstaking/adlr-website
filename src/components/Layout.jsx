import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, ChevronDown, ShoppingCart, User } from 'lucide-react'
import Logo from './Logo'
import Favicon from './Favicon'
import { useSiteInfo } from '../hooks/useSiteInfo'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()
  const { siteInfo } = useSiteInfo()
  const { isAuthenticated } = useAuth()
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [location])

  // Navigation
  const mainNav = [
    { name: 'Accueil', path: '/' },
    {
      name: 'Services',
      path: '/services',
      hasDropdown: true,
      dropdownKey: 'services',
      items: [
        { name: 'Lavage', path: '/services/lavage' },
        { name: 'Polish', path: '/services/polish' },
        { name: 'Céramique', path: '/services/ceramique' },
        { name: 'Cire', path: '/services/cire' },
      ]
    },
    { name: 'Configurateur', path: '/configurateur' },
    { name: 'Boutique', path: '/boutique' },
    { name: 'Tutoriels', path: '/tutoriels' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  // Hide footer on configurator pages for better UX
  const hideFooter = location.pathname.startsWith('/configurateur')

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Favicon />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">

            {/* Logo - Left */}
            <Link to="/" className="flex items-center">
              <Logo className="h-14" />
            </Link>

            {/* Desktop Navigation - Center/Right */}
            <nav className="hidden lg:flex items-center space-x-8">
              {mainNav.map((item) => (
                item.hasDropdown ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.dropdownKey)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'text-dark-900'
                          : 'text-dark-600 hover:text-dark-900'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${openDropdown === item.dropdownKey ? 'rotate-180' : ''}`} />
                    </Link>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {openDropdown === item.dropdownKey && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-sand-200 py-2 overflow-hidden"
                        >
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                isActive(subItem.path)
                                  ? 'bg-sand-100 text-dark-900 font-medium'
                                  : 'text-dark-600 hover:bg-sand-100 hover:text-dark-900'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                          {item.dropdownKey === 'services' && (
                            <div className="border-t border-sand-200 mt-2 pt-2">
                              <Link
                                to="/services"
                                className="block px-4 py-2.5 text-sm font-medium text-dark-900 hover:bg-sand-100 transition-colors"
                              >
                                Tous les services →
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-dark-900'
                        : 'text-dark-600 hover:text-dark-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}

              {/* Cart & User Icons */}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-sand-200">
                <Link
                  to="/panier"
                  className="relative p-2 rounded-lg text-dark-600 hover:text-dark-900 hover:bg-sand-100 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-dark-900 text-white text-xs rounded-full flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to={isAuthenticated ? '/compte' : '/connexion'}
                  className="p-2 rounded-lg text-dark-600 hover:text-dark-900 hover:bg-sand-100 transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
              </div>
            </nav>

            {/* Mobile Cart & User + Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                to="/panier"
                className="relative p-2 rounded-lg text-dark-900 hover:bg-sand-200 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-dark-900 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-dark-900 hover:bg-sand-200 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-sand-200"
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {mainNav.map((item) => (
                  item.hasDropdown ? (
                    <div key={item.name}>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.dropdownKey ? null : item.dropdownKey)}
                        className="flex items-center justify-between w-full py-3 px-4 rounded-lg font-medium text-dark-600 hover:bg-sand-100 hover:text-dark-900 transition-colors"
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.dropdownKey ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.dropdownKey && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1"
                          >
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className={`block py-2 px-4 text-sm transition-colors ${
                                  isActive(subItem.path)
                                    ? 'text-dark-900 font-medium'
                                    : 'text-dark-500 hover:text-dark-900'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                        isActive(item.path)
                          ? 'bg-sand-200 text-dark-900'
                          : 'text-dark-600 hover:bg-sand-100 hover:text-dark-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                ))}

                {/* Account link */}
                <div className="border-t border-sand-200 mt-4 pt-4">
                  <Link
                    to={isAuthenticated ? '/compte' : '/connexion'}
                    className="flex items-center py-3 px-4 rounded-lg font-medium text-dark-600 hover:bg-sand-100 hover:text-dark-900 transition-colors"
                  >
                    <User className="w-5 h-5 mr-3" />
                    {isAuthenticated ? 'Mon compte' : 'Connexion'}
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - hidden on configurator pages */}
      {!hideFooter && (
      <footer className="bg-sand-300/40 border-t border-sand-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Logo className="h-10 mb-6" />
              <p className="text-dark-500 text-sm leading-relaxed mb-6">
                {siteInfo?.description || "Expert en detailing automobile. Nous redonnons l'éclat à votre véhicule avec des techniques professionnelles et des produits premium."}
              </p>
              <div className="flex space-x-3">
                {siteInfo?.social?.instagram && (
                  <a
                    href={siteInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-dark-900 flex items-center justify-center text-white hover:bg-dark-700 transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {siteInfo?.social?.facebook && (
                  <a
                    href={siteInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-dark-900 flex items-center justify-center text-white hover:bg-dark-700 transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-dark-900 font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                <li><Link to="/services/lavage" className="text-dark-500 hover:text-dark-900 transition-colors text-sm">Lavage</Link></li>
                <li><Link to="/services/polish" className="text-dark-500 hover:text-dark-900 transition-colors text-sm">Polish</Link></li>
                <li><Link to="/services/ceramique" className="text-dark-500 hover:text-dark-900 transition-colors text-sm">Céramique</Link></li>
                <li><Link to="/services/cire" className="text-dark-500 hover:text-dark-900 transition-colors text-sm">Cire</Link></li>
              </ul>
            </div>

            {/* Liens Utiles */}
            <div>
              <h4 className="text-dark-900 font-semibold mb-6">Liens Utiles</h4>
              <ul className="space-y-3">
                <li><Link to="/configurateur" className="text-dark-500 hover:text-dark-900 transition-colors text-sm">Configurateur</Link></li>
                <li><Link to="/boutique" className="text-dark-500 hover:text-dark-900 transition-colors text-sm">Boutique</Link></li>
                <li><Link to="/tutoriels" className="text-dark-500 hover:text-dark-900 transition-colors text-sm">Tutoriels</Link></li>
                <li><Link to="/contact" className="text-dark-500 hover:text-dark-900 transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-dark-900 font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                {siteInfo?.contact?.address && (
                  <li className="flex items-start text-sm">
                    <MapPin className="w-4 h-4 text-dark-900 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-dark-500">
                      {siteInfo.contact.address}
                      {siteInfo.contact.postalCode && <><br />{siteInfo.contact.postalCode} {siteInfo.contact.city}</>}
                    </span>
                  </li>
                )}
                {siteInfo?.contact?.phone && (
                  <li>
                    <a href={`tel:${siteInfo.contact.phone.replace(/\s/g, '')}`} className="flex items-center text-sm text-dark-500 hover:text-dark-900 transition-colors">
                      <Phone className="w-4 h-4 text-dark-900 mr-3 flex-shrink-0" />
                      {siteInfo.contact.phone}
                    </a>
                  </li>
                )}
                {siteInfo?.contact?.email && (
                  <li>
                    <a href={`mailto:${siteInfo.contact.email}`} className="flex items-center text-sm text-dark-500 hover:text-dark-900 transition-colors">
                      <Mail className="w-4 h-4 text-dark-900 mr-3 flex-shrink-0" />
                      {siteInfo.contact.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-sand-400 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-dark-400 text-sm">
              &copy; {new Date().getFullYear()} {siteInfo?.name || 'ADLR Cosmetic Auto'}. Tous droits réservés.
            </p>
            <p className="text-dark-400 text-sm mt-2 md:mt-0">
              Site créé par{' '}
              <a
                href="https://swigs.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-dark-900 transition-colors"
              >
                Swigs
              </a>
            </p>
          </div>
        </div>
      </footer>
      )}
    </div>
  )
}

export default Layout
