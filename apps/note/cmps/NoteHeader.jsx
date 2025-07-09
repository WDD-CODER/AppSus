

export function NoteHeader() {


    return (
        <header className="note-header">
            <section className="filter-selection">
                <button className="icon-menu icon">menu</button>
                <img className="keep-logo" src="../../assets/images/keep_2020q4_48dp.png" alt="keep-img" />
                <span className="cur-filter-at flex">Keep</span>
            </section>
            <section className="app-actions">
                <label htmlFor="search-for" className="search-for">
                    <input id="search-for" type="text" hidden/>

                </label>
                <button data-type={'Search'} className="icon-search icon hover-show">search</button>
                <button data-type={'Refresh'} className="icon-refresh icon hover-show">refresh</button>
                <button data-type={'Settings'} className="icon-settings icon hover-show">settings</button>
            </section>
            <section className="user-actions">
                <button data-type={'Google Apps'} className="icon-apps icon hover-show">apps</button>
                <button data-type={'Google account'} className="user-circle hover-show">D</button>
            </section>
        </header>
    )
}