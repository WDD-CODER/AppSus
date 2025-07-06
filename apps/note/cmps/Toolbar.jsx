import {noteService} from '../services/note.service.js'
const { useSearchParams } = ReactRouterDOM
export function ToolBar() {

    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <section className="tool-bar flex">
            <button data-toolbar={'Formatting option'} className="icon-format_color_text  icon hover-show">format_color_text</button>
            <button data-toolbar={'Background color'} className="icon-palette icon hover-show">palette</button>
            <button data-toolbar={'Add alert'} className="icon-add_alert icon hover-show"> add_alert </button>
            <button data-toolbar={'Collaborator'} className="icon-person_add iconhover-show"> person_add </button>
            <button data-toolbar={'Add image'} className="icon-image icon hover-show">image</button>
            <button data-toolbar={'Archive'} className="icon-archive icon hover-show">archive</button>
            <button  data-toolbar={'Archive'} className="icon-delete icon hover-show">delete</button>
            <button data-toolbar={'More'} className="icon-more_vert icon hover-show"> more_vert </button>
        </section>
    )
}
