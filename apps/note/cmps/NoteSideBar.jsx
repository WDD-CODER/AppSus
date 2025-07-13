import { noteService } from "../services/note.service"

const { useState, useEffect } = React
const { useSearchParams, Link } = ReactRouterDOM

export function NoteSideBar({ defaultFilter, onSetFilterBy }) {

    const [isActive, setIsActive] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })



    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function onSetActiveFilterBtn({ currentTarget }) {
        if (isActive === currentTarget) {
            currentTarget.classList.remove('long', 'active')
            setSearchParams({})
            setIsActive(null)
        } else {
            if (isActive) {
                isActive.classList.remove('long', 'active')
                setSearchParams({})
                setIsActive(null)

            }
            searchParams.set('filterBy', currentTarget.dataset.filter)
            setSearchParams(searchParams)
            currentTarget.classList.add('long', 'active')
            setIsActive(currentTarget)
        }
    }



    return (
        <section className="note-side-bar">
            <div className="filters-container">
                <div className="selection-container flex align-center" onClick={onSetActiveFilterBtn}>
                    <button className="icon-lightbulb icon">lightbulb</button>
                    <Link to="/note"><span >Notes</span></Link>
                </div>
                <div className="selection-container flex align-center" onClick={onSetActiveFilterBtn}>
                    <button className="icon-notifications icon">notifications</button>
                    <span >Reminders</span>
                </div>
                <div className="selection-container flex align-center" onClick={onSetActiveFilterBtn}>
                    <button className="icon-edit icon">edit</button>
                    <span >Labels</span>
                </div>
                <div data-filter="archive" className="selection-container flex align-center" onClick={onSetActiveFilterBtn}>
                    <button className="icon-archive icon">archive</button>
                    <span>archive</span>
                </div>
                <div className="selection-container flex align-center " onClick={onSetActiveFilterBtn}>
                    <button className="icon-delete icon">delete</button>
                    <span >Trashed</span>
                </div>
            </div>
        </section>
    )
}
