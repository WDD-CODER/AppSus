const { Link, NavLink } = ReactRouterDOM

export function SideNav() {

function f(){
    
}

    return <div className="side-bar">
        <h3>LOGO ✨</h3>
        <section>
            <nav className="note-nav-bar">
            <NavLink to=""><button>Notes</button></NavLink>
            <NavLink to=""><button>Remainders</button></NavLink>
            <NavLink to=""><button>Privet</button></NavLink>
            <NavLink to=""><button>Labels</button></NavLink>
            <NavLink to=""><button>Archive</button></NavLink>
            <NavLink to=""><button>Trashed</button></NavLink>
            </nav>
       </section>
    </div>
}
