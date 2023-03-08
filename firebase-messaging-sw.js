importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC31DIUKHmFsg_jtl18F-xqLGbIidiq4dE",
    authDomain: "testchat07.firebaseapp.com",
    databaseURL: "https://testchat07.firebaseio.com",
    projectId: "firebase-testchat07",
    storageBucket: "firebase-testchat07.appspot.com",
    messagingSenderId: "235883844924",
    appId: "1:235883844924:web:66788e8c0b6bc215aafa39"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const isSupported = firebase.messaging.isSupported();
const db = firebase.database(app);

if (isSupported) {
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(({ data: { title, body, image } }) => {
        self.registration.showNotification(title, {
            body,
            icon: image || '/assets/icons/icon-72x72.png'
        });
    });
}
