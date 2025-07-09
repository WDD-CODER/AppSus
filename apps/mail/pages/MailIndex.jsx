import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

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

    function updateMailInList(updatedMail) {
        setMails(prevMails => 
            prevMails.map(mail => (
                mail.id === updatedMail.id ? updatedMail : mail
            ))
        )
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailFolderList />
            <MailHeader />
            <MailList mails={mails} onUpdateMailList={updateMailInList} />
            {/* <h1>Mails:</h1> */}
            {/* <table className="mails-table">
                <MailList mails={mails} />
            </table> */}

        </section>
    )
}

