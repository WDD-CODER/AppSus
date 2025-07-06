const { Link, NavLink } = ReactRouterDOM

export function SideBar() {
    return <div className="side-bar box">
        <section>
            <nav className="note-nav-bar">
                <button className="icon-lightbulb icon" ></button>
                <button className="icon-bell icon"></button>
                <button className="icon-pen icon"></button>
                <button className="icon-privet icon" ></button>
                <button className="icon-archive icon" ></button>
                <button className="icon-trash-can icon" > </button>
            </nav>
        </section>
    </div>
}
// Notes
// Reminders
// Labels
// Privet
// Archive
// Trashed