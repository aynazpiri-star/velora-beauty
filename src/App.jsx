import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTopRoute from './components/ScrollToTopRoute'
import ScrollTopButton from './components/ScrollTopButton'
import About from './pages/About'
import Consultation from './pages/Consultation'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Journal from './pages/Journal'
import NotFound from './pages/NotFound'
import PostDetail from './pages/PostDetail'
import ProjectDetail from './pages/ProjectDetail'
import Projects from './pages/Projects'
import ServiceDetail from './pages/ServiceDetail'
import Services from './pages/Services'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <ScrollToTopRoute />
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<PostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <ScrollTopButton />
    </div>
  )
}
