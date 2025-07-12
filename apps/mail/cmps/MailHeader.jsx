import { MailFilter } from "./MailFilter.jsx"
// const { useNavigate } = ReactRouterDOM

export function MailHeader({ filterBy, onSetFilterBy }) {

    // const navigate = useNavigate()

    return (
        <header className="mail-header">
            <div className="mail-folder-list-hamburger icon-menu icon">menu</div>
            <img className="gmail-logo" src="/../assets/images/Gmail-logo.png" alt="Gmail-Logo" />
            <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
        </header>
    )
}