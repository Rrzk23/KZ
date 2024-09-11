import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import style from './styles/App.module.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutMe from './components/AboutMe'
import Projects from './components/Projects'
import MileStone from './components/MileStone'
import ContactMe from './components/ContactMe'

function App() {

  return (
    <div className={style.container}>
      <Navbar/>
      <HeroSection/>
      <AboutMe/>
      <Projects/>
      <MileStone/>
      <ContactMe/>
    </div>
  )
}

export default App
