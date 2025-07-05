const { Link, NavLink } = ReactRouterDOM

export function NoteSideBar() {
    return <div className="note-side-bar box">
        <section>
            <nav className="note-nav-bar">
                <button className="icon-lightbulb" ></button>
                <button className="icon-bell"></button>
                <button className="icon-pen"></button>
                <button className="icon-privet" ></button>
                <button className="icon-archive" ></button>
                <button className="icon-trash-can" > </button>
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