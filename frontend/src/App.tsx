
import style from './styles/App.module.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutMe from './components/Skills'
import Projects from './components/Projects'
import MileStone from './components/MileStone'
import ContactMe from './components/ContactMe'
import { Admin } from './models/Admin'
import Skills from './components/Skills'
import Project2 from './components/Project2'
import { motion } from 'framer-motion';


function App() {

  //const [admin, setAdmin] = useState<Admin| null>(null);

  return (
    <div className={style.container}>
      
      <Navbar/>
      <HeroSection/>
      <Skills/>
      <Projects/>
      <ContactMe/>

    </div>
  )
}

export default App
