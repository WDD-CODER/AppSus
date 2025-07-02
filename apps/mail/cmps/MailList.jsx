import { MailPreview } from "./MailPreview.jsx"
const { Link } = ReactRouterDOM

export function MailList({ mails }) {


    if (!mails.length) return <div>No Mails to Show...</div>
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <li className={mail.isRead ? 'read' : 'unread'} key={mail.id}>
                    <Link to={`/mail/${mail.id}`}>
                        <MailPreview mail={mail} />
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
