

export function NoteHeader() {


    return (
        <header className="note-header">
            <section className="filter-selection">
                <button ><span className="icon-menu icon">menu</span></button>
                <img className="keep-logo" src="../../../assets/images/keep_2020q4_48dp.png" alt="keep-img" />
                <span className="cur-filter-at flex">Keep</span>
            </section>
            <section className="app-actions">
                <label htmlFor="search-for" className="search-for">
                    <input id="search-for" type="text" hidden/>

                </label>
                <button data-type={'Search'} className=" hover-show"><span className="icon-search icon">search</span></button>
                <button data-type={'Refresh'} className=" hover-show"><span className="icon-refresh icon">refresh</span></button>
                <button data-type={'Settings'} className=" hover-show"><span className="icon-settings icon">settings</span></button>
            </section>
            <section className="user-actions">
                <button data-type={'Google Apps'} className=" hover-show"><span className="icon-apps icon">apps</span></button>
                <button data-type={'Google account'} className="hover-show"><span className="user-circle ">D</span></button>
            </section>
        </header>
    )
}