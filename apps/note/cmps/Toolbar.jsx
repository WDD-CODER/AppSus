import { noteService } from '../services/note.service.js'
const { useSearchParams } = ReactRouterDOM
export function ToolBar() {

    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <section className="tool-bar flex">

            <button data-toolbar={'Formatting option'} className=" hover-show">
                <span className='icon-format_color_text  icon archive'>format_color_text</span>
            </button>

            <button data-toolbar={'Archive'} className=" hover-show">
                <span className='icon-archive icon archive'>archive</span>
            </button>

            <button data-toolbar={'Background color'} className="hover-show">
                <span className="icon-palette icon">palette</span>
            </button>

            <button data-toolbar={'Add alert'} className="hover-show">
                <span className="icon-add_alert icon">add_alert</span>
            </button>

            <button data-toolbar={'Collaborator'} className="hover-show">
                <span className="icon-person_add icon">person_add</span>
            </button>

            <button data-toolbar={'Add image'} className="hover-show">
                <span className="icon-image icon">image</span>
            </button>

            <button data-toolbar={'More'} className="hover-show">
                <span className="icon-more_vert icon">more_vert</span>
            </button>
        </section>
    )
}
