
const { useSearchParams } = ReactRouterDOM
export function ToolBar() {

    const [searchParams, setSearchParams] = useSearchParams()


    return (
        <section className="tool-bar flex">
            <button data-toolbar={'Formatting option'} className="formatting-option hover-show">X</button>
            <button data-toolbar={'Background color'} className="background-color hover-show">X</button>
            <button data-toolbar={'remainder'} className="remainder hover-show">X</button>
            <button data-toolbar={'Collaborator'} className="collaborator hover-show">X</button>
            <button data-toolbar={'Add image'} className="add-img hover-show">X</button>
            <button data-toolbar={'Archive'} className="archive hover-show">X</button>
        </section>
    )
}