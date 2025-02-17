import {get_by_class, get_by_query, on, _prototypes} from "./_helper.js";

let _z_index = 90;

export function _popup() {
    _prototypes();

    let _popups = get_by_class('_popup', true);
    let _popup_contents = get_by_class('_popup-content', true);

    on('keydown', function (event) {
        if (event.key === "Escape") {
            _popup_close();
        }
    });

    // on('click', function (event) {
    //     for (let i in _popup_contents) {
    //         if (_popup_contents[i] instanceof HTMLElement) {
    //             let trigger = _popups[i].dataset.trigger;
    //             if (!_popup_contents[i].contains(event.target) && !event.target.closest(trigger)) {
    //                 if (event.target.closest('._popup')) event.target.closest('._popup').style.display = 'none';
    //             }
    //         }
    //     }
    // });

    for (let i in _popups) {
        if (_popups[i] instanceof HTMLElement) {
            let trigger = _popups[i].dataset.trigger;
            document.body.on('click', trigger,() => {
                _popups[i].style.display = 'flex';
                let zIndex = _z_index++;
                _popups[i].style.setProperty("z-index", zIndex.toString(), "important");
            });

            _popups[i].on('click', (e) => {
                if (e.target.classList.contains('_popup-close')) {
                    e.target.closest('._popup').style.display = 'none';
                }
                // _popups[i].style.display = 'none';
            });
        }
    }
}

export function _popup_close()
{
    let _popups = get_by_class('_popup', true);

    for (let i in _popups) {
        for (let i in _popups) {
            if (_popups[i] instanceof HTMLElement) {
                _popups[i].style.display = 'none';
            }
        }
    }
}