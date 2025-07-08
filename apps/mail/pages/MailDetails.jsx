import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { MailDetailsHeader } from "../cmps/MailDetailsHeader.jsx"

const { useParams, useNavigate, useLocation } = ReactRouterDOM
const { useState, useEffect } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state && location.state.mail && location.state.mail.id === params.mailId) {
            setMail(location.state.mail)
            setIsLoading(false)
        } else {
            loadMail()
        }
    }, [params.mailId, location.state])

    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => {
                setMail(mail)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get mail..')
                navigate('/mail')
            })
            .finally(() => setIsLoading(false))
    }

    function onToggleMailRead(mailToUpdate) {
        const updatedMail = { ...mailToUpdate, isRead: !mailToUpdate.isRead }
        setMail(updatedMail)

        mailService.save(updatedMail)
            .then(savedMail => console.log('Mail details status saved:', savedMail))
            .catch(err => {
                console.log('Error updating mail read status:', err)
                showErrorMsg('Could not update mail status.')
                setMail(mailToUpdate)
            })
    }

    function onBack() {
        navigate('/mail')
    }

    if (isLoading || !mail) return <div>Loading...</div>

    const fullTimeAndDate = utilService.getFullDateAndTime(mail.sentAt)
    const { subject, body, from } = mail

    return (
        <section className="mail-details">
            <MailDetailsHeader
                onBack={onBack}
                mail={mail}
                onToggleMailRead={onToggleMailRead} />
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