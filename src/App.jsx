import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import AboutMe        from './components/AboutMe'
import Stats          from './components/Stats'
import Skills         from './components/Skills'
import Projects       from './components/Projects'
import Automation     from './components/Automation'
import Certifications from './components/Certifications'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Aurora         from './components/Aurora'
import ScrollProgress from './components/ScrollProgress'

/* App.jsx — solo organiza los componentes, sin lógica de negocio */
export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary relative">
      {/* Aurora de fondo — fija detrás de todo el contenido */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Aurora
          colorStops={['#00d4ff', '#8b5cf6', '#00d4ff']}
          amplitude={1.5}
          blend={0.7}
          speed={0.3}
        />
      </div>

      <div className="relative z-10">
        <ScrollProgress />
        <Navbar />

      <main>
        {/* Hero */}
        <Hero />

        {/* Sobre mí */}
        <AboutMe />

        {/* Estadísticas */}
        <Stats />

        {/* Habilidades */}
        <Skills />

        {/* Proyectos */}
        <Projects />

        {/* Automatización */}
        <Automation />

        {/* Formación & Certificaciones */}
        <Certifications />

        {/* Contacto */}
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
      </div>
    </div>
  )
}
