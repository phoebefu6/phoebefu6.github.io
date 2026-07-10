import { Navbar } from './components/Navbar'
import { ClickSpark } from './components/ui/ClickSpark'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Products } from './components/Products'
import { Services } from './components/Services'
import { Writes } from './components/Writes'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="relative">
      <ClickSpark />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Services />
        <Writes />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
