

export function ColorDropDown({ onSetBgColor, onSetBgImg }) {

    const images = []

    return (
        <div className="color-drop-down container box ">
            <ul className="color-choose flex">
                <li onClick={() => onSetBgColor('red')} style={{ backgroundColor: 'red' }}
                    data={'Red'} className="color-pick box hover-show">

                </li>
                <li onClick={() => onSetBgColor('green')} style={{ backgroundColor: 'green' }}
                    data={'Green'} className="color-pick box hover-show">

                </li>
                <li onClick={() => onSetBgColor('blue')} style={{ backgroundColor: 'blue' }}
                    data={'Blue'} className="color-pick box hover-show">

                </li>
                <li onClick={() => onSetBgColor('orange')} style={{ backgroundColor: 'orange' }}
                    data={'Orange'} className="color-pick box hover-show">

                </li>
                <li onClick={() => onSetBgColor('purple')} style={{ backgroundColor: 'purple' }}
                    data={'Purple'} className="color-pick box hover-show">

                </li>
                <li onClick={() => onSetBgColor('brown')} style={{ backgroundColor: 'brown' }}
                    data={'Brown'} className="color-pick box hover-show">

                </li>
                <li onClick={() => onSetBgColor('gray')} style={{ backgroundColor: 'gray' }}
                    data={'Gray'} className="color-pick box hover-show">

                </li>
                <li onClick={() => onSetBgColor('pink')} style={{ backgroundColor: 'pink' }}
                    data={'Pink'} className="color-pick box hover-show">

                </li>
            </ul>
            <ul className="color-choose flex">

                <li onClick={() => onSetBgImg('url("../assets/images/coverImg1.png")')}
                    style={{ backgroundImage: 'url("../assets/images/coverImg1.png")' }}
                    data={'img'} className="img-pick box hover-show">

                </li>
                <li onClick={() => onSetBgImg('url("../assets/images/coverImg2.png")')}
                    style={{ backgroundImage: 'url("../assets/images/coverImg2.png")' }}
                    data={'img'} className="img-pick box hover-show">

                </li>
                <li onClick={() => onSetBgImg('url("../assets/images/coverImg3.png")')}
                    style={{ backgroundImage: 'url("../assets/images/coverImg3.png")' }}
                    data={'img'} className="img-pick box hover-show">

                </li>
                <li onClick={() => onSetBgImg('url("../assets/images/coverImg4.png")')}
                    style={{ backgroundImage: 'url("../assets/images/coverImg4.png")' }}
                    data={'img'} className="img-pick box hover-show">

                </li>
                <li onClick={() => onSetBgImg('url("../assets/images/coverImg5.png")')}
                    style={{ backgroundImage: 'url("../assets/images/coverImg5.png")' }}
                    data={'img'} className="img-pick box hover-show">

                </li>

            </ul>
        </div>
    )

} 