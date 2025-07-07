import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { MailDetailsHeader } from "../cmps/MailDetailsHeader.jsx"

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

    const fullTimeAndDate = utilService.getFullDateAndTime(mail.sentAt)
    const { subject, body, isRead, from } = mail

    return (
        <section className="mail-details">
            <MailDetailsHeader onBack={onBack}/>
            <p className="mail-details-subject">{subject}</p>
            <div className="mail-data-details">
                <p className="mail-details-from">{from}</p>
                <div className="function-btns">
                    <p className="full-time-details">{fullTimeAndDate}</p>
                    <button className="icon-star icon">star</button>
                </div>
            </div>
            <pre className="mail-details-body">{body}</pre>
        </section>
    )
}