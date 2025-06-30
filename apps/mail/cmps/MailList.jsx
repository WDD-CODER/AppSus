import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {

    if (!mails.length) return <div>No Mails to Show...</div>
    return (
        <tbody className="mail-list">
            {mails.map(mail => (
                <tr key={mail.id}>
                    <MailPreview mail={mail} />
                </tr>
            ))}
        </tbody>
    )
}
