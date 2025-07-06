
const { useSearchParams } = ReactRouterDOM
export function ToolBar() {

    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <section className="tool-bar flex">
            <button data-toolbar={'Formatting option'} className="formatting-option hover-show">
                <span className="icon-format_color_text  icon">format_color_text</span>
            </button>

            <button data-toolbar={'Background color'} className="background-color hover-show">
                <span class="icon-palette icon">palette</span>
            </button>

            <button data-toolbar={'Add alert'} className="add-alert hover-show">
                <span class="icon-add_alert icon">add_alert</span>
            </button>

            <button data-toolbar={'Collaborator'} className="collaborator hover-show">
                <span class="icon-person_add icon">person_add</span>
            </button>

            <button data-toolbar={'Add image'} className="add-img hover-show">
                <span class="icon-image icon">image</span>
            </button>

            <button data-toolbar={'Archive'} className="archive hover-show">
                <span class="icon-archive icon">archive</span>
            </button>

            <button data-toolbar={'More'} className="more-options hover-show">
                <span class="icon-more_vert icon">more_vert</span>
            </button>
        </section>
    )
}
