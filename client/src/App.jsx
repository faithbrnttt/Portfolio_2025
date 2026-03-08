import './App.css'
import logo from './assets/logo.png'
import { useState } from 'react'
import './fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from './components/Nav'
import singleKey from './assets/single-key.mp3'
import Contact from "./components/Contact";
import ProjectCards from './components/ProjectCards'

export function playSound() {
  const audio = new Audio(singleKey);
  audio.currentTime = 0;
  audio.play();
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <>
      <div className="nav-container-container">
        <div className="nav-container">
          <div className="item1"><a href="/"><img className="logo" src={logo}></img></a></div>
          <div className="item2">
            <button
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon="faBars" />
            </button>

            {/* Drawer */}
            <div className={`nav-content ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
              <button
                className="close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon="faXmark" />
              </button>

              <Nav closeMenu={() => setMenuOpen(false)} />
            </div>
          </div>


        </div>
      </div>
      <div className="container">

        <div className="item3">
          <h1>Full-Stack Developer • Data Engineer • Integration Engineer</h1>
        </div>
        <div className="item4">

        </div>
        <div className="item5">


        </div>
        <div className="item6">6</div>
        <div className="item7">7</div>


      </div>
      
      <div className="item8"></div>
      <div id="prodivide" className="divider">

        <div className="item9"></div>
        <div className="item10"></div>
      </div>
      
      <div id="pcont" className="project-container">
        <div id="projects" className="project-title">
          <div onClick={playSound} className="p">P</div>
          <div onClick={playSound} className="r">R</div>
          <div onClick={playSound} className="o">O</div>
          <div onClick={playSound} className="j">J</div>
          <div onClick={playSound} className="e">E</div>
          <div onClick={playSound} className="c">C</div>
          <div onClick={playSound} className="t">T</div>
          <div onClick={playSound} className="s">S</div>
        </div>
        <div className="body-container">
          <ProjectCards />
        </div>
      </div>
      <div id="codivide" className="divider">
        <div className="item11"></div>
        <div className="item12"></div>
      </div>
  

      <div className="contact-container">
        <Contact />
      </div>
    </>
  )
}

export default App
