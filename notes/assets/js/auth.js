// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { config } from "../../config.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = config();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;


        // sendEmailVerification(user)
        //     .then(() => {
        //         // Email verification sent!
        //         // ...
        //     });

        // ...
    } else {
        // User is signed out
        // ...
        console.log('Signed out')
    }
});



// createUserWithEmailAndPassword(auth, 'jaigcasan@gmail.com', 'samplepass123')
//     .then((userCredential) => {
//         // Signed up
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//     });

// signInWithEmailAndPassword(auth, 'jaigcasan@gmail.com', 'samplepass123')
//     .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log(user)
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorMessage)
//     });

// signOut(auth).then(() => {
//     // Sign-out successful.
// }).catch((error) => {
//     // An error happened.
// });