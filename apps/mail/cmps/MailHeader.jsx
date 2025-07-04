const { useNavigate } = ReactRouterDOM

export function MailHeader() {

    const navigate = useNavigate()

    return (
        <header className="mail-header container">
            <div className="mail-sidebar-hamburger">≡</div>
            <div className="gmail-logo">LOGO</div>
            <p>wil be here search cmp</p>
        </header>
    )
}