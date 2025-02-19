import {app_init, applyActionCode, getAuth} from "../../core/_firebase_src.js";
import {get_url_parameter, redirect_to} from "../../core/_helper.js";
import {_routes} from "../../config/config.js";

app_init().then(() => {
    const auth = getAuth();

    verifyEmailCheck(auth);

    function verifyEmailCheck(auth)
    {
        let _mode = get_url_parameter('mode');
        let _oobCode = get_url_parameter('oobCode');

        if (_mode && _oobCode) {
            applyActionCode(auth, _oobCode).then(() => {
                redirect_to(_routes['route_home']['path'])
            }).catch((error) => {
                console.log(error);
            });
        }
    }
});