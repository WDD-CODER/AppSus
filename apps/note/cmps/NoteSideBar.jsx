
const { useState, useEffect, useRef } = React
const { useSearchParams, useNavigate } = ReactRouterDOM

export function NoteSideBar({ defaultFilter, onSetFilterBy, isSideBarLong, onToggleSidebar }) {

    const [isActive, setIsActive] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const containerRef = useRef()


useEffect(() => {
    if (!isSideBarLong) {
        onToggleSidebar()
        removeLong()}
}, [isSideBarLong])

    function onSetActiveFilterBtn({ currentTarget }) {

        if (isActive === currentTarget) {
            currentTarget.classList.remove('long', 'active')
            setSearchParams({})
            setIsActive(null)
            onToggleSidebar()
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

        if (currentTarget.id === 'note') navigate(`/${currentTarget.id}`)
    }


    function removeLong() {
        if (!containerRef.current) return
        const longEls = containerRef.current.querySelectorAll('.long')
        longEls.forEach(el => el.classList.remove('long'))
    }

    return (
        <section className="note-side-bar">
            <div ref={containerRef} className="filters-container">
                <div className="selection-container flex align-center" id="note" onClick={onSetActiveFilterBtn}>
                    <button className="icon-lightbulb icon">lightbulb</button>
                    <span >Notes</span>
                </div>
                {/* <div className="selection-container flex align-center Untouchable" id="reminders"
                // onClick={onSetActiveFilterBtn}
                >
                    <button className="icon-notifications icon Untouchable">notifications</button>
                    <span >Reminders</span>
                </div>
                <div className="selection-container flex align-center Untouchable" id="edit"
                //  onClick={onSetActiveFilterBtn}
                >
                    <button className="icon-edit icon Untouchable">edit</button>
                    <span >Labels</span>
                </div> */}
                <div data-filter="archive" className="selection-container flex align-center " id="archive" onClick={onSetActiveFilterBtn}>
                    <button className="icon-archive icon">archive</button>
                    <span>archive</span>
                </div>
                {/* <div className="selection-container flex align-center Untouchable" id="trashed"
                //  onClick={onSetActiveFilterBtn}
                >
                    <button className="icon-delete icon Untouchable">delete</button>
                    <span >Trashed</span>
                </div> */}
            </div>
        </section>
    )
}
