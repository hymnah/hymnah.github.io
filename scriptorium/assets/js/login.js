import {app_init, getAuth, signInWithEmailAndPassword} from "../../core/_firebase_src.js";
import {get_by_id, redirect_to} from "../../core/_helper.js";
import {_errors} from "../../core/_errors.js";
import {_routes} from "../../config/config.js";


app_init().then(() => {
    const auth = getAuth();

    get_by_id('_login_form').onsubmit = function (event) {
        event.preventDefault();

        let _username = get_by_id('_username');
        let _password = get_by_id('_password');

        signInWithEmailAndPassword(auth, _username.value, _password.value).then((credentials) => {
            if (!credentials.user['emailVerified']) {
                get_by_id('_login_form_error').innerText = _errors['auth/email-not-verified'];
                return;
            }
            redirect_to(_routes['route_home']['path']);
        }).catch((error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            get_by_id('_login_form_error').innerText = _errors[errorCode];
        }))
    }
});