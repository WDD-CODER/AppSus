import { ComposeMail } from "./ComposeMail.jsx"

const { useState, useEffect } = React

export function MailFolderList({ filterBy, onSetFilterBy }) {

    const [isActive, setIsActive] = useState()
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        setFilterByToEdit(filterBy)
    }, [filterBy])

    function onChangeFolder(folderName, ev) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, folder: folderName }))
        onSetFilterBy({ ...filterBy, folder: folderName })
        onSetActive(ev)
    }

    function onSetActive(ev) {
        if (isActive) {
            isActive.classList.remove('long')
            isActive.classList.remove('active')
        }

        ev.currentTarget.classList.add('long')
        ev.currentTarget.classList.add('active')
        setIsActive(ev.currentTarget)
    }

    // const currentFolder = filterBy.folder

    return (
        <section className="mail-folder-list">
            <div className="mail-filters-container">
                <ComposeMail />
                <div className="mail-filter-container flex align-center"
                    onClick={(ev) => onChangeFolder('inbox', ev)}>
                    <button className="icon-inbox icon">inbox</button>
                    <span>Inbox</span>
                </div>
                <div className="mail-filter-container flex align-center"
                    onClick={(ev) => onChangeFolder('starred', ev)}>
                    <button className="icon-star icon" >star</button>
                    <span>Starred</span>
                </div>
                <div className="mail-filter-container flex align-center"
                    onClick={(ev) => onChangeFolder('sent', ev)}>
                    <button className="icon-send icon">send</button>
                    <span>Sent</span>
                </div>
                <div className="mail-filter-container flex align-center"
                    onClick={(ev) => onChangeFolder('draft', ev)}>
                    <button className="icon-draft icon">draft</button>
                    <span>Draft</span>
                </div>
                <div className="mail-filter-container flex align-center"
                    onClick={(ev) => onChangeFolder('trash', ev)}>
                    <button className="icon-delete icon">delete</button>
                    <span>Trash</span>
                </div>
            </div>
        </section>
    )
}