import {app_init, getAuth, getDatabase, onValue, orderByChild, query, ref, set} from "../../core/_firebase_src.js";
import {_prototypes, generate_id, get_by_id, get_date_now} from "../../core/_helper.js";

app_init().then((app) => {
    _prototypes();

    const auth = getAuth();
    const database = getDatabase(app);

    let chatConfig = localStorage.getItem('chat');

    if (chatConfig) {
        chatConfig = JSON.parse(chatConfig);
    }

    if (!chatConfig || !chatConfig.username) {
        let person = prompt("Please enter your name", "");

        if (person) {
            get_by_id('chat-field').removeAttribute('disabled');
            chatConfig = {
                username: person,
                id: generate_id(5)
            };

            localStorage.setItem('chat', JSON.stringify(chatConfig));
        } else {
            alert('Username is required');
            location.reload();
            return;
        }

    } else {
        get_by_id('chat-field').removeAttribute('disabled');
    }


    let chatField = get_by_id('chat-field');
    let chatForm = get_by_id('chat-form');

    chatField.on('keydown', (event) => {
        if (event.key === "Enter") {
            if (event.shiftKey) {
                // Insert new line
                event.preventDefault();
                const cursorPos = chatField.selectionStart;
                chatField.value =
                    chatField.value.substring(0, cursorPos) +
                    "\n" +
                    chatField.value.substring(cursorPos);
                chatField.selectionStart = chatField.selectionEnd = cursorPos + 1;
            } else {
                event.preventDefault();

                // Send message
                get_by_id('submit').click();
            }
        }
    });

    get_by_id('chat-form').on('submit', (e) => {
        e.preventDefault();

        write_chat(app, {
            message: chatField.value,
            userId: chatConfig.id,
            userName: chatConfig.username,
            creationDate: get_date_now(),
        });

        chatField.value = '';
    })

    let convArea = get_by_id('conv-area');

    get_chat(app, (data) => {
        let html = '';

        for (let i in data) {
            if (typeof data[i] !== 'undefined') {
                let messageObj = data[i];
                let chatterName = messageObj.userId !== chatConfig.id ? messageObj.userName : '';
                let chatterClass = messageObj.userId === chatConfig.id ? 'chat-mine' : 'm-b-20'

                html += `<div class="each-chat ${chatterClass}">
                            <div class="m-l-20 chatter-name m-b-2">${chatterName}</div>
                            <div class="inner-each-chat">${messageObj.message}</div>
                        </div>`;
            }
        }

        convArea.innerHTML = html;
        convArea.scrollTop = convArea.scrollHeight;
    });
})

function write_chat(app, content)
{
    const database = getDatabase(app);

    let _ref = 'chat/messages/'
    _ref = _ref + generate_id(7);

    set(ref(database, _ref), content);
}

async function get_chat(app, callback)
{
    const database = getDatabase(app);

    let _ref = 'chat/messages/'
    let scripts = query(ref(database, _ref), orderByChild('creationDate'));

    onValue(scripts, (snapshot) => {
        let _return_obj = {};
        snapshot.forEach(child => {
            _return_obj[child.key] = child.val();
        });
        callback(Object.fromEntries(Object.entries(_return_obj)));
    });

}