const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <img src="./assets/images/logo.png" alt="logo-img" />
        <nav className="header-nav-bar flex ">
            <NavLink to="/mail"> <img src="./assets/images/mail.png" alt="mail-img" /><span className="hide-txt" >Mail</span></NavLink>
            <NavLink to="/note"> <img src="./assets/images/keep.png" alt="keep-img" /><span className="hide-txt">Keep</span></NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/home">Home</NavLink>
        </nav>
    </header>
}
