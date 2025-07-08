import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
import { MailPreviewBtns } from "./MailPreviewBtns.jsx"
const { Link } = ReactRouterDOM

export function MailList({ mails }) {

    function readMail(mailToUpdate) {
            const updatedMail = { ...mailToUpdate, isRead: true }
    
            mailService.save(updatedMail)
                .then(savedMail => console.log(savedMail))
                .catch(err => {
                    console.log('Error updating mail read status:', err)
                    showErrorMsg('Could not update mail status.')
                })
        }

    if (!mails.length) return <div>No Mails to Show...</div>
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <li className={mail.isRead ? 'read' : 'unread'} key={mail.id}>
                    <Link to={`/mail/${mail.id}`} onClick={(ev) => readMail(mail)}>
                        <MailPreview mail={mail} />
                        <MailPreviewBtns mail={mail} />
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
