import resume from '../assets/Burnett_Baseline_Resume.pdf'

const Nav = ({closeMenu}) => {
    return (
        <div>
            <ul className="nav-list">
                <li><a onClick={closeMenu} href={resume} target="_blank" rel="noopener noreferrer">Resume</a></li>
                <li><a onClick={closeMenu} href="#projects">Projects</a></li>
                <li><a onClick={closeMenu} href="">Contact</a></li>
            </ul>
        </div>
    )
}

export default Nav;