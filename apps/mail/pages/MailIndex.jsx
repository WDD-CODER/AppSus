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
    const [isSidebarLong, setIsSidebarLong] = useState(false)

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

    function onToggleMailStarred(mailId) {
        mailService.get(mailId)
            .then(mailToStarred => {
                const updatedMail = { ...mailToStarred, isStarred: !mailToStarred.isStarred }
                return mailService.save(updatedMail)
            })
            .then(savedMail => {
                updateMailInList(savedMail)
                console.log(savedMail.isStarred ? 'Mail starred!' : 'Mail unstarred!')
                if (filterBy.folder === 'starred') {
                    loadMails()
                }
            })
            .catch(err => console.log('err', err))
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function toggleModal(str) {
        if (str === 'open') setIsVisable(true)
        if (str === 'close') setIsVisable(false)
    }

    function toggleSidebar() {
        setIsSidebarLong(prevIsSidebarLong => !prevIsSidebarLong)
    }

    function onDeleteMail(mailId) {
        mailService.get(mailId)
            .then(mail => {
                if (!mail.removedAt) {
                    mail.removedAt = Date.now()
                    mailService.save(mail)
                        .then(trashedMail => {
                            setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
                            console.log('mail has trashed!', trashedMail)
                            showSuccessMsg('Mail is moved to trash folder..')
                        })
                        .catch(err => {
                            console.log('err', err)
                            showErrorMsg('cant trashed mail')

                        })
                } else {
                    mailService.remove(mailId)
                        .then(deletedMail => {
                            setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
                            console.log('mail has deleted!', deletedMail)
                            showSuccessMsg('Mail has deleted!')
                        })
                        .catch(err => {
                            console.log('err', err)
                            showErrorMsg('Cant deleted mail')
                        })
                }
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cant get mail..')
            })
    }

    if (!mails) return <div>Loading...</div>

    return (
        <section className={`mail-index ${isSidebarLong ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
            <MailFolderList
                onSetFilterBy={onSetFilterBy} filterBy={filterBy}
                toggleModal={toggleModal} isVisable={isVisable} setIsVisable={setIsVisable} isSidebarLong={isSidebarLong} />
            <MailHeader onSetFilterBy={onSetFilterBy} filterBy={filterBy} toggleSidebar={toggleSidebar} />
            <MailList
                mails={mails}
                onUpdateMailList={updateMailInList}
                onDeleteMail={onDeleteMail}
                onToggleMailStarred={onToggleMailStarred} />
            {isVisable && <ComposeMail toggleModal={toggleModal} isVisable={isVisable} setIsVisable={setIsVisable} />}
        </section>
    )
}

