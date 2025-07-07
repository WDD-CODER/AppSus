const { useNavigate } = ReactRouterDOM

export function MailHeader() {

    const navigate = useNavigate()

    return (
        <header className="mail-header">
            <div className="mail-folder-list-hamburger">≡</div>
            <img className="gmail-logo" src="../../assets/images/Gmail-logo.png" alt="Gmail-Logo" />
            <p>wil be here search cmp</p>
        </header>
    )
}