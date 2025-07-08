import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
import { MailPreviewBtns } from "./MailPreviewBtns.jsx"
import { showErrorMsg } from "../../../services/event-bus.service.js"
const { Link } = ReactRouterDOM

export function MailList({ mails, onUpdateMailList }) {

    function handleMailClick(mailToUpdate) {
        const originalIsRead = mailToUpdate.isRead
        const updatedMail = { ...mailToUpdate, isRead: true }

        onUpdateMailList(updatedMail)

        mailService.save(updatedMail)
            .then(savedMail => console.log('Mail saved and marked as read:', savedMail))
            .catch(err => {
                console.log('Error updating mail read status:', err)
                showErrorMsg('Could not update mail status. Please refresh.')
                onUpdateMailList({ ...mailToUpdate, isRead: originalIsRead })
            })
    }

    if (!mails.length) return <div>No Mails to Show...</div>
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <li className={mail.isRead ? 'read' : 'unread'} key={mail.id}>
                    <Link
                        to={`/mail/${mail.id}`}
                        onClick={(ev) => handleMailClick(mail)}
                        state={{ mail: { ...mail, isRead: true } }}
                    >
                        <MailPreview mail={mail} />
                        <MailPreviewBtns mail={mail} onToggleMailRead={onUpdateMailList} />
                    </Link>
                </li>
            ))}
        </ul>
        // <tbody className="mail-list">
        //     {mails.map(mail => (
        //         <tr key={mail.id}>
        //             <MailPreview mail={mail} />
        //         </tr>
        //     ))}
        // </tbody>
    )
}
