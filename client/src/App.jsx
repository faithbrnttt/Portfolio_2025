import './App.css'
import logo from './assets/logo.png'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

import Nav from './components/Nav'


import ProjectCards from './components/ProjectCards'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <>
      <div className="nav-container-container">
        <div className="nav-container">
          <div className="item1"><img className="logo" src={logo}></img></div>
          <div className="item2">
            <button
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Drawer */}
            <div className={`nav-content ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
              <button
                className="close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faXmark} />
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
      <div className="divider">

        <div className="item9"></div>
        <div className="item10"></div>
      </div>
      <div className="project-title">
        <div className="p">P</div>
        <div className="r">R</div>
        <div className="o">O</div>
        <div className="j">J</div>
        <div className="e">E</div>
        <div className="c">C</div>
        <div className="t">T</div>
        <div className="s">S</div>
      </div>
      <div className="body-container">

        <ProjectCards />
      </div>
    </>
  )
}

export default App
