import { MailList } from "../cmps/MailList.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function MailIndex() {

    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => setMails(mails))
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot get mails!')
            })
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailHeader />
            <MailList mails={mails} />
            {/* <h1>Mails:</h1> */}
            {/* <table className="mails-table">
                <MailList mails={mails} />
            </table> */}

        </section>
    )
}

