import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { firebaseConfig, routesConfig } from "../../config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        const uid = user.uid;

        window.location.replace(routesConfig.homePage);
        return;
        $('#loader').hide();
    } else {
        $('#loader').hide();
        console.log('Signed out')
    }
});

$('#signup_form').on('submit', function () {
    let uname = $('#username').val();
    let pass = $('#password').val();

    createUserWithEmailAndPassword(auth, uname, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);

            if (!user['emailVerified']) {
                sendEmailVerification(user)
                    .then(() => {
                        console.log('Email verification sent');
                    });
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});


// createUserWithEmailAndPassword(auth, 'jaigcasan@gmail.com', 'samplepass123')
//     .then((userCredential) => {
//         const user = userCredential.user;
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//     });