import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, child, set, get, update, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { firebaseConfig, routesConfig } from "../../config.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

let dbRef = `notes_project/users/`;
let dataCount = 0;
let notes = ref(database, dbRef);


onAuthStateChanged(auth, (user) => {
    if (user) {
        // console.log(user);
        const uid = user.uid;

        dbRef = `notes_project/users/${uid}/`;
        // console.log(dbRef);
        notes = ref(database, dbRef);
        onValue(notes, (snapshot) => {
            const data = snapshot.val();
            if (!!data) {
                dataCount = Object.keys(data).length;
                renderNotes(data);
            } else {
                renderNotes([]);
                console.log('No data available');
            }
        });
    } else {
        location.replace(routesConfig.loginPage);
    }
});


let body = $('body');
let addNoteBtn = $('#add-note-btn');
let addNoteForm = $('#add-note-form');
let addNoteAddBtn = $('#add-note-add');
let closeBtn = $('#add-note-close');
let popupWrap = $('#popup-wrap');
let addNoteTitle = $('#add-note-title');
let addNoteContent = $('#add-note-content');
let addNoteHash = $('#add-note-hash');

let deleteNoteIcon = '.note-delete';
let deletePopupWrap = $('#delete-popup-wrap');
let deleteNoteForm = $('#delete-note-form');
let deletePopup = $('#delete-popup');
let deleteCloseBtn = $('#delete-note-close');
let deleteNoteDeleteBtn = '#delete-note-delete';

let searchNote = $('#note-search');

let noteId = '';

closeBtn.on('click', function () {
    popupWrap.fadeOut(50);
});

deleteCloseBtn.on('click', function () {
    deletePopupWrap.fadeOut(50);
});

addNoteBtn.on('click', function () {
    clearFields();
    popupWrap.fadeIn(50);
});

popupWrap.on('click', function (e) {
    if (!addNoteForm[0].contains(e.target)) {
        popupWrap.fadeOut(50);
    }
})

deletePopupWrap.on('click', function (e) {
    if (!deleteNoteForm[0].contains(e.target)) {
        deletePopupWrap.fadeOut(50);
    }
})

addNoteAddBtn.on('click', function () {
    if (addNoteForm[0].checkValidity()) {
        writeUserData(addNoteTitle.val(), addNoteContent.val(), addNoteHash.val());
        popupWrap.fadeOut(50);
    }
});

addNoteForm.on('submit', function(e) {
    e.preventDefault();
});

body.on('click', deleteNoteDeleteBtn, function () {
    const updates = {};
    updates[`${dbRef}${noteId}`] = null;
    update(ref(database), updates)
    deletePopupWrap.fadeOut(50);
})

body.on('click', deleteNoteIcon, function () {
    noteId = $(this).data('note-id');
    $(deleteNoteDeleteBtn).attr('data-note-id', noteId);
    deletePopupWrap.fadeIn(50);
})

searchNote.on('input', function () {
    let searchStr = $(this).val();
    $('#notes .note-div').each(function () {
        let thisNote = $(this);
        if (searchStr !== '') {
            if (thisNote.html().toLowerCase().indexOf(searchStr) > -1) {
                thisNote.show();
            } else {
                thisNote.hide();
            }
        } else {
            thisNote.show();
        }
    })
});

function writeUserData(title, content, email) {
    set(ref(database, dbRef + randomString(5)), {
        title: title,
        content: content,
        hash: email,
        createdDateTime: Math.floor(Date.now() / 1000)
    });
}

function randomString(length, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function clearFields() {
    addNoteTitle.val('');
    addNoteContent.val('');
    addNoteHash.val('');
}

function renderNotes(results) {
    let notes = '';
    let procResults = [];
    for (let result in results) {
        if (results.hasOwnProperty(result)) {
            results[result]['id'] = result;
            procResults.push(results[result]);
        }
    }

    procResults.sort((a,b) => a.createdDateTime - b.createdDateTime);

    for (let result in procResults) {
        if (procResults.hasOwnProperty(result)) {
            let resultItem = procResults[result];
            let noteDiv = $('#ref .note-div').clone();
            noteDiv.find('.note-link').attr('href', 'notes_edit.html?note_id=' + resultItem.id);
            noteDiv.find('.note-delete').attr('data-note-id', resultItem.id);
            noteDiv.find('.note-title').attr('title', resultItem.title).html(resultItem.title);
            noteDiv.find('.note-content').html(resultItem.content);
            noteDiv.find('.note-hashes').html(splitHashes(resultItem.hash));
            noteDiv.css('display', 'inline-block');
            let notesHtml = noteDiv.wrap('<div>').parent().html();
            notes += notesHtml;
        }
    }
    $('.main #notes').html(notes);
}

function splitHashes(hashStr)
{
    let hashes = hashStr.split(' ');
    let hashesStr = '';
    for (let i in hashes) {
        if (hashes.hasOwnProperty(i)) {
            hashesStr += '<a class="hash-link" href="#">' + hashes[i] + '</a> ';
        }
    }
    return hashesStr;
}