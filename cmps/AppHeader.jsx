const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header box">
        <img className="hamburger" src="./assets/images/hamburger.png" alt="hamburger-img" />
        <img src="./assets/images/logo.png" alt="logo-img" />

        <label htmlFor="search-bar container">
            <input type="text" id="search-bar" />
        </label>
        <nav className="header-nav-bar flex align-center">
            <NavLink to="/mail"> <img src="./assets/images/mail.png" alt="mail-img" /><span className="hide-txt" >Mail</span></NavLink>
            <NavLink to="/note"> <img src="./assets/images/keep.png" alt="keep-img" /><span className="hide-txt">Keep</span></NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/home">Home</NavLink>
        </nav>
    </header>
}
