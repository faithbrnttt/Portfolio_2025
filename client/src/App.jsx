import './App.css'
import logo from './assets/logo.png'
import ransom from './assets/ransom.png'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Nav from './components/Nav'
import projects from './assets/projects.png'
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
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <div className={`nav-content ${menuOpen ? 'open' : ''}`}>
              <Nav closeMenu={() => setMenuOpen(false)} />
            </div>
          </div>

        </div>
      </div>
      <div class="container">

        <div className="item3">
          <img className="ransom" src={ransom}></img>
        </div>
        <div className="item4">

        </div>
        <div className="item5">


        </div>
        <div className="item6">6</div>
        <div className="item7">7</div>


      </div>
      <div className="rejects">
        <p className="reject1">Hello FAITH BURNETT Thank you for submitting your application for the above referenced position. We regret to inform you that you were not selected for this role. We believe your skills and background could be a great fit for future opportunities and encourage you to stay in touch. Wishing you great success, Acquisition</p>
        <p className="reject2">Dear Faith,

          Thank you for allowing us the opportunity to consider you for employment by applying for a Software Development Intern - Python and Linux position. We recognize that there are many employers for you to choose from, and we sincerely appreciate your time and interest in our company.

          We were fortunate to receive a large volume of qualified applications, and we regret to inform you that this particular position is no longer vacant. If you haven't already, we hope you will connect with us on LinkedIn, and we encourage you to apply for other openings at our company that may interest you.

          Sincerely,
          Acquisition Team</p>
        <p className="reject3">Hello Faith -

          Thank you for your interest in the 308729 Full Stack Software Developer - Early Career position. Your interest is genuinely appreciated. After careful consideration, we regret to inform you that you have not been selected for this position. We encourage you to continue to review and apply for other opportunities.

          Thank you again for your interest. We wish you the best of luck on your search.


          Best Regards,
          Acquisition Team</p>
        <p className="reject4">Hi Faith,

          Thank you for your recent application for the position of Graduate Software Developer. We appreciate the time you put into your application.

          After careful consideration, we regret to inform you that we will not be progressing your application to the next stage.

          We will keep your profile in our database and contact you if a more suitable opportunity becomes available. In the meantime, we encourage you to visit our career site regularly for updates on future roles.

          We wish you all the best in your job search and future endeavours.

          Kind regards,

          The Recruitment Team</p>
        <p className="reject5">
          Dear Faith,



          Thank you for your interest in employment. The review of your application for the Junior Data Scientist (Entry IT Professional) position (Job Posting #36877) has been completed.



          We regret to inform you that you were not selected for further consideration for this position. The time and effort you took to submit an application is greatly appreciated. We encourage you to continue to apply for other positions that interest you.



          Sincerely
        </p>
        <p className="reject6">
          Hello Faith,

          Thank you for considering ----- as the next step in your professional journey.

          Our Recruitment team has reviewed your resume for Frontend Engineering Apprentice. After careful consideration, we are moving forward with candidates who are closely aligned with their requirements.


          We wish you all the best in your job search, and thank you again for your interest..

          Best
        </p>
      </div>
      <div className="item8"></div>
      <div className="divider">

        <div className="item9"></div>
        <div className="item10"></div>
      </div>
      <div className="project-title">
        <img src={projects}></img>
      </div>
      <div className="body-container">

        <div className="item11">
          <div class="card">
            <div class="head">Window</div>
            <div class="content">
              This is a neobrutalist-style window with a button and space for any content
              you want!
              <br />
              <button class="button">Button</button>
            </div>
          </div>
        </div>
        <div className="item12">
          <div class="card">
            <div class="head">Window</div>
            <div class="content">
              This is a neobrutalist-style window with a button and space for any content
              you want!
              <br />
              <button class="button">Button</button>
            </div>
          </div>
        </div>
        <div className="item13">
          <div class="card">
            <div class="head">Window</div>
            <div class="content">
              This is a neobrutalist-style window with a button and space for any content
              you want!
              <br />
              <button class="button">Button</button>
            </div>
          </div>
        </div>
        <div className="item14">
          <div class="card">
            <div class="head">Window</div>
            <div class="content">
              This is a neobrutalist-style window with a button and space for any content
              you want!
              <br />
              <button class="button">Button</button>
            </div>
          </div>
        </div>
        <div className="item15">
          <div class="card">
            <div class="head">Window</div>
            <div class="content">
              This is a neobrutalist-style window with a button and space for any content
              you want!
              <br />
              <button class="button">Button</button>
            </div>
          </div>
        </div>
        <div className="item16">
          <div class="card">
            <div class="head">Window</div>
            <div class="content">
              This is a neobrutalist-style window with a button and space for any content
              you want!
              <br />
              <button class="button">Button</button>
            </div>
          </div>
        </div>
        <div className="item17">
          <div class="card">
            <div class="head">Window</div>
            <div class="content">
              This is a neobrutalist-style window with a button and space for any content
              you want!
              <br />
              <button class="button">Button</button>
            </div>
          </div>
        </div>
        <div className="item18">
          <div class="card">
            <div class="head">Window</div>
            <div class="content">
              This is a neobrutalist-style window with a button and space for any content
              you want!
              <br />
              <button class="button">Button</button>
            </div>
          </div>
        </div>
        <div className="item19">
          <div class="card">
            <div class="head">Window</div>
            <div class="content">
              This is a neobrutalist-style window with a button and space for any content
              you want!
              <br />
              <button class="button">Button</button>
            </div>
          </div>
        </div>


      </div>
      <div className="item20"></div>
    </>
  )
}

export default App
