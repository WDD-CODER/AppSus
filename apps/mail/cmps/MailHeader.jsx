import { MailFilter } from "./MailFilter.jsx"

export function MailHeader({ filterBy, onSetFilterBy, toggleSidebar }) {

    return (
        <header className="mail-header">
            <div className="mail-folder-list-hamburger icon-menu icon"
                onClick={toggleSidebar}>menu</div>
            <img className="gmail-logo" src="assets/images/Gmail-logo.png" alt="Gmail-Logo" />
            <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
        </header>
    )
}