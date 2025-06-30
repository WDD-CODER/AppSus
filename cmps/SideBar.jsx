const { Link, NavLink } = ReactRouterDOM

export function SideBar() {
    return <div className="side-bar">
        <img src="./assets/images/logo.png" alt="logo-img" />
        <section>
            <nav className="note-nav-bar">
            <NavLink to=""><button className="icon-lightbulb" >Notes</button></NavLink>
            <NavLink to=""><button className="icon-bell">Reminders</button></NavLink>
            <NavLink to=""><button className="icon-pen">Labels</button></NavLink>
            <NavLink to=""><button className="icon-privet" >Privet</button></NavLink>
            <NavLink to=""><button className="icon-archive" >Archive</button></NavLink>
            <NavLink to=""><button className="icon-trash-can" >Trashed </button></NavLink>
            </nav>
       </section>
    </div>
}
