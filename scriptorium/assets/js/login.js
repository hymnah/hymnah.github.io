import {app_init, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "../../core/_firebase_src.js";
import {get_by_id} from "../../core/_helper.js";
import {_errors} from "../../core/_errors.js";


app_init().then(() => {
    const auth = getAuth();

    get_by_id('_login_form').onsubmit = function (event) {
        event.preventDefault();

        signInWithEmailAndPassword(auth, get_by_id('_username').value, get_by_id('_password').value).then(() => {

        }).catch((error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);

            get_by_id('_login_form_error').innerText = _errors[errorCode];
        }))
    }

    // 'jaigcasan@gmail.com', 'cheekybert1*'
});