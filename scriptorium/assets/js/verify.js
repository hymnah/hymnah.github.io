import {app_init, applyActionCode, getAuth} from "../../core/_firebase_src.js";
import {get_url_parameter} from "../../core/_helper.js";

app_init().then(() => {
    const auth = getAuth();

    verifyEmailCheck(auth);

    function verifyEmailCheck(auth)
    {
        let _mode = get_url_parameter('mode');
        let _oobCode = get_url_parameter('oobCode');

        console.log(_mode, _oobCode);

        if (_mode && _oobCode) {

            applyActionCode(auth, _oobCode).then().catch((error) => {
                console.log(error);
            });
        }
    }
});