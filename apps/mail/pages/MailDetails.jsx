import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get mail..')
            })
            .finally(() => setIsLoading(false))
    }

    function onBack() {
        navigate('/mail')
    }

    if (isLoading) return <div>Loading...</div>

    const { subject, body, isRead, sentAt, from } = mail
    return (
        <section className="mail-details">
            {/* will be here nav-header */}
            <p className="mail-details-subject">{subject}</p>
            <div className="mail-details-header">
                <p className="mail-details-from">{from}</p>
                <div className="function-btns">
                    <p className="full-time-details">{sentAt}</p>
                    <button className="starred-btn">⭐</button> {/* will change the icons */}
                    <button className="replay-btn">↱</button>
                </div>
            </div>
            <pre className="mail-details-body">{body}</pre>
        </section>
    )
}