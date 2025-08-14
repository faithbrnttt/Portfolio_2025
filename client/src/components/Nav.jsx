const Nav = ({closeMenu}) => {
    return (
        <div>
            <ul className="nav-list">
                <li><a onClick={closeMenu} href="">Resume</a></li>
                <li><a onClick={closeMenu} href="">Projects</a></li>
                <li><a onClick={closeMenu} href="">Contact</a></li>
            </ul>
        </div>
    )
}

export default Nav;