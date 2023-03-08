const firebaseConfig = {
    apiKey: "AIzaSyC31DIUKHmFsg_jtl18F-xqLGbIidiq4dE",
    authDomain: "testchat07.firebaseapp.com",
    databaseURL: "https://testchat07.firebaseio.com",
    projectId: "firebase-testchat07",
    storageBucket: "firebase-testchat07.appspot.com",
    messagingSenderId: "235883844924",
    appId: "1:235883844924:web:66788e8c0b6bc215aafa39"
};

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        }
    })
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics(app);
const messaging = firebase.messaging();
const db = firebase.database(app);

messaging.getToken({ vapidKey: 'BA7MlQy5W_4XtfAP4ds38etvyywuz4BMD7lGzELYmHG4iViUx_VWd6gbR9bi0z8C4vmA8XkscWdkpKRNrP8LBkE' }).then((currentToken) => {
    if (currentToken) {
        // document.getElementById('token').innerText = currentToken;
        writeSubsTokens(currentToken);
        readSubsTokens().then((value) => {
        //     let xhr = new XMLHttpRequest();
        //     xhr.open('POST', 'https://fcm.googleapis.com/fcm/notification', true);
        //     xhr.setRequestHeader('Content-Type', 'application/json');
        //     xhr.setRequestHeader('Authorization', 'key=' + firebaseConfig.apiKey);
        //     xhr.setRequestHeader('project_id', firebaseConfig.messagingSenderId);
        //     xhr.onreadystatechange = function() {
        //         if (xhr.readyState === 4 && xhr.status === 200) {
        //             console.log(xhr.response);
        //         }
        //     }
        //     xhr.send(JSON.stringify(
        //         {
        //             "operation": "create",
        //             "notification_key_name": "notif_com_project",
        //             "registration_ids": value
        //         }
        //     ));

        });





        // Send the token to your server and update the UI if necessary
        // ...
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});



function writeSubsTokens(token) {
    let arrVal = [];

    readSubsTokens().then((value) => {
        if (!!value) {
            arrVal = value;
        }

        // if token is found, dont push again
        if (arrVal.indexOf(token) < 0) {
            arrVal.push(token);
        }

        db.ref('fcm_tokens')
            .set(arrVal);
    });

    return arrVal;
}

async function readSubsTokens() {
    let token = '';

    await db.ref('fcm_tokens').get().then((snapshot) => {
        token = snapshot.val();
    });

    return token;
}

// function writeUserData(userId, name, email, imageUrl) {
//     db.ref('notif/' + userId)
//         .set({
//             username: name,
//             email: email,
//             profile_picture : imageUrl
//         });
// }
//
// function readUserData(userId) {
//     db.ref('notif/' + userId).on('value', (snapshot) => {
//         const data = snapshot.val();
//         setTimeout(function () {
//             var notif = new Notification('Hello there !', {
//                 body: 'from: ' + data.email,
//                 icon: 'https://icon-library.com/images/cog-icon/cog-icon-4.jpg'
//             })
//         }, 2000)
//     },(error) => {
//         console.error(error);
//     });
// }
//
// writeUserData('1', 'albert', 'sample@sample.com', '');
// readUserData('1');