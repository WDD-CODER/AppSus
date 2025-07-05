

export function NoteHeader() {


    return (
        <header className="note-header">
            <section className="filter-selection">
                <button className="hamburger"></button>
                <img className="keep-img" src="" alt="keep-img" />
                <span className="cur-filter-at"></span>
            </section>
            <section className="app-actions">
                <label htmlFor="search-for" className="search-for">
                    <input id="search-for" type="text" hidden/>
                </label>
                <button data-toolbar={'Search'} className="search-icon hover-show">🔍</button>
                <button data-toolbar={'Refresh'} className="Refresh-icon hover-show">🪟</button>
                <button data-toolbar={'Settings'} className="Settings-icon hover-show">⚙️</button>
            </section>
            <section className="user-actions">
                <button data-toolbar={'Google Apps'} className="apps-icon hover-show">🈸</button>
                <button data-toolbar={'Google account'} className="account-icon hover-show">@ </button>
            </section>
        </header>
    )
}