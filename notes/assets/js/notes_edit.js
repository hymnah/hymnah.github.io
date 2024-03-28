import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, child, set, get, update, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { firebaseConfig, routesConfig } from "../../config.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const url = new URL(location.href);
const noteId = url.searchParams.get('note_id');
let dbRef = `notes_project/users/`;
let dataCount = 0;

let noteTitle = $('#note-title');
let noteContent = $('#note-content');
let noteHash = $('#note-hash');

noteTitle.prop('disabled', true);
noteContent.prop('disabled', true);
noteHash.prop('disabled', true);

let editNoteBack = $('#edit-note-back');
let editNoteSave = $('#edit-note-save');

let createdDateTime = '';
let notes = ref(database, dbRef);


onAuthStateChanged(auth, (user) => {
    if (user) {
        // console.log(user);
        const uid = user.uid;
        dbRef = `notes_project/users/${uid}/${noteId}/`;
        // console.log(dbRef);
        notes = ref(database, dbRef);
        onValue(notes, (snapshot) => {
            const data = snapshot.val();
            if (!!data) {
                createdDateTime = data.createdDateTime;
                renderNotes(data);
            } else {
                console.log('No data available');
            }
        });
        // return;
        // $('#loader').hide();
    } else {
        $('#loader').hide();
        console.log('Signed out')
    }
});

editNoteBack.on('click', function () {
    location.replace(routesConfig.homePage);
});

editNoteSave.on('click', function () {
    const updates = {};
    updates[dbRef] = {
        title: noteTitle.val(),
        content: noteContent.html(),
        hash: noteHash.val(),
        createdDateTime: createdDateTime
    };
    update(ref(database), updates)
    location.replace(routesConfig.homePage);
});

function renderNotes(data) {
    noteTitle.val(data.title).prop('disabled', false);
    noteContent.html(data.content).prop('disabled', false);
    noteHash.val(data.hash).prop('disabled', false);
}
