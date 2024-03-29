import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { firebaseConfig, routesConfig } from "../../config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        const uid = user.uid;

        window.location.replace(routesConfig.homePage);
        return;
    } else {
        $('#loader').hide();

        $('#signup_form').on('submit', function () {
            let formData = $(this).serializeArray();
            let uName = '';
            let pass = '';

            formData.forEach(function (v) {
                if (v.name === 'username') {
                    uName = v.value;
                }

                if (v.name === 'password') {
                    pass = v.value;
                }
            });

            signInWithEmailAndPassword(auth, uName, pass)
                .then((userCredential) => {
                    location.replace(routesConfig.homePage);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                });

        });
    }
});