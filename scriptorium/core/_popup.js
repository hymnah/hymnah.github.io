import {get_by_class, get_by_query, on, _prototypes} from "./_helper.js";

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
    //                 _popups[i].style.display = 'none';
    //             }
    //         }
    //     }
    // });

    for (let i in _popups) {
        if (_popups[i] instanceof HTMLElement) {
            let trigger = _popups[i].dataset.trigger;
            document.body.on('click', trigger,() => {
                _popups[i].style.display = 'flex';
            });

            _popups[i].on('click', '._popup-close', () => {
                _popups[i].style.display = 'none';
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