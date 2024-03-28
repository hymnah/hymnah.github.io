import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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
        console.log('Signed out')
    }
});