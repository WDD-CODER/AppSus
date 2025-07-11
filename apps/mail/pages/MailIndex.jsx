import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { ComposeMail } from "../cmps/ComposeMail.jsx"
import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [isVisable, setIsVisable] = useState(false)

    useEffect(() => {
        loadMails()
        setSearchParams(utilService.getTruthyValues(filterBy))
    }, [filterBy])

    useEffect(() => {
        setFilterBy(mailService.getFilterFromSearchParams(searchParams))
    }, [searchParams])

    function loadMails() {
        mailService.query(filterBy)
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

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function toggleModal(str) {
        if (str === 'open') setIsVisable(true)
        if (str === 'close') setIsVisable(false)
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailFolderList
                onSetFilterBy={onSetFilterBy} filterBy={filterBy}
                toggleModal={toggleModal} isVisable={isVisable} setIsVisable={setIsVisable} />
            <MailHeader onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            <MailList mails={mails} onUpdateMailList={updateMailInList} />
            {/* <h1>Mails:</h1> */}
            {/* <table className="mails-table">
                <MailList mails={mails} />
            </table> */}
            {isVisable && <ComposeMail toggleModal={toggleModal} isVisable={isVisable} setIsVisable={setIsVisable} />}

        </section>
    )
}

