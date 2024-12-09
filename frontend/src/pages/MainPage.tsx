import React from 'react';
import style from '../styles/App.module.css';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import ContactMe from '../components/ContactMe';
import {Element } from 'react-scroll';

const MainPage = () => {
  return (
    <div className={style.container}>
        <Navbar />
        

        <Element name="home">
          <section id="home">
            <HeroSection />
          </section>
        </Element>

        <Element name="skills">
          <section id="skills">
            <Skills />
          </section>
        </Element>

        <Element name="projects">
          <section id="projects">
            <Projects />
          </section>
        </Element>

        <Element name="contact me">
          <section id="contact me">
            <ContactMe />
          </section>
        </Element>
      </div>
  )
}

export default MainPage