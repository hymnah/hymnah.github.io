import {app_init, createUserWithEmailAndPassword, getAuth, sendEmailVerification} from "../../core/_firebase_src.js";
import {get_by_id, _prototypes, redirect_to} from "../../core/_helper.js";
import {_errors} from "../../core/_errors.js";
import {_routes} from "../../config/config.js";

app_init().then(() => {
    _prototypes();

    const auth = getAuth();

    get_by_id('_signup_form').on('submit', function (event) {
        event.preventDefault();

        let _username = get_by_id('_username').value;
        let _password = get_by_id('_password').value;
        let _verify_password = get_by_id('_verify_password').value;

        if (_password !== _verify_password) {
            get_by_id('_signup_form_error').innerText = _errors['auth/password-not-matching'];
            return;
        }

        createUserWithEmailAndPassword(auth, _username, _password)
            .then((userCredential) => {
                const user = userCredential.user;

                if (!user['emailVerified']) {
                    sendEmailVerification(user)
                        .then(() => {
                            redirect_to(_routes['route_login']['path']);
                        }).catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                get_by_id('_signup_form_error').innerText = _errors[errorCode];
            });
    })

});