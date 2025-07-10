import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React

export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    // const onSetFilterByDebounce = useRef(utilService.debounce(onSetFilterBy, 500)).current

    useEffect(() => {
        setFilterByToEdit(filterBy)
    }, [filterBy])

    // useEffect(() => {
    //     if (JSON.stringify(filterByToEdit) !== JSON.stringify(filterBy)) {
    //         onSetFilterByDebounce(filterByToEdit)
    //     }
    // }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt } = filterByToEdit

    return (
        <form className="mail-filter" onSubmit={onSubmitFilter}>
            <button className="icon-search icon">search</button>
            <input onChange={handleChange} value={txt || ''}
                type="text" name="txt" id="txt"
                placeholder="Search mail" />
        </form>
    )
}