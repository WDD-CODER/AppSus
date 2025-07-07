import { mailService } from "../services/mail.service.js";

export function MailDetailsHeader({ onBack }) {

    return (
        <section className="mail-details-header">
            <button className="icon-arrow_back icon" onClick={onBack}>arrow_back</button>
            <button className="icon-delete icon">delete</button>
            <button className="icon-mark_email_unread icon">mark_email_unread</button>
        </section>
    )
}