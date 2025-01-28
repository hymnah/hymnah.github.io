import {_app_config} from "../config/config.js";
import {_firebase_config} from "../config/config.js";

const firebaseSource = {
    fbApp: `https://www.gstatic.com/firebasejs/${_app_config.firebase_version}/firebase-app.js`,
    fbAuth: `https://www.gstatic.com/firebasejs/${_app_config.firebase_version}/firebase-auth.js`,
    fbDb: `https://www.gstatic.com/firebasejs/${_app_config.firebase_version}/firebase-database.js`
}

export async function app_init() {
    let { initializeApp } = await import(firebaseSource.fbApp);
    return initializeApp(_firebase_config);
}

export const { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail } = await import(firebaseSource.fbAuth);
export const { getDatabase, ref, set, update, onValue, query, orderByChild, orderByKey, orderByValue } = await import(firebaseSource.fbDb);


// export let dbRefPath = appConfig.fb_rdb_ref;
// export let dbRef = ref(getDatabase, dbRefPath);