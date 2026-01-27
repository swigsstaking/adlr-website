import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const HomeV2 = lazy(() => import('./pages/HomeV2'))
const HomeV3 = lazy(() => import('./pages/HomeV3'))
const HomeV4 = lazy(() => import('./pages/HomeV4'))
const Services = lazy(() => import('./pages/Services'))
const Configurator = lazy(() => import('./pages/Configurator'))
const ConfiguratorV2 = lazy(() => import('./pages/ConfiguratorV2'))
const Shop = lazy(() => import('./pages/Shop'))
const ShopV2 = lazy(() => import('./pages/ShopV2'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Tutorials = lazy(() => import('./pages/Tutorials'))
const TutorialsV2 = lazy(() => import('./pages/TutorialsV2'))
const TutorialDetail = lazy(() => import('./pages/TutorialDetail'))
const Contact = lazy(() => import('./pages/Contact'))

// Auth & Shop pages
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Account = lazy(() => import('./pages/Account'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Success = lazy(() => import('./pages/Success'))

// Service pages
const LavageService = lazy(() => import('./pages/services/Lavage'))
const PolishService = lazy(() => import('./pages/services/Polish'))
const CeramiqueService = lazy(() => import('./pages/services/Ceramique'))
const CireService = lazy(() => import('./pages/services/Cire'))

// Loading component with ADLR branding
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-dark-900">
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-white/60 text-sm tracking-wider uppercase">Chargement...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/v2" element={<HomeV2 />} />
            <Route path="/v3" element={<HomeV3 />} />
            <Route path="/v4" element={<HomeV4 />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/lavage" element={<LavageService />} />
            <Route path="/services/polish" element={<PolishService />} />
            <Route path="/services/ceramique" element={<CeramiqueService />} />
            <Route path="/services/cire" element={<CireService />} />
            <Route path="/configurateur" element={<Configurator />} />
            <Route path="/configurateur-v2" element={<ConfiguratorV2 />} />
            <Route path="/boutique" element={<Shop />} />
            <Route path="/boutique-v2" element={<ShopV2 />} />
            <Route path="/boutique/:id" element={<ProductDetail />} />
            <Route path="/tutoriels" element={<Tutorials />} />
            <Route path="/tutoriels-v2" element={<TutorialsV2 />} />
            <Route path="/tutoriels/:id" element={<TutorialDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/compte" element={<Account />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App
