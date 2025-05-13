import {
    app_init,
    getAuth,
    getDatabase,
    onAuthStateChanged,
    onValue,
    orderByChild, orderByKey, orderByValue,
    query,
    ref,
    set
} from "./_firebase_src.js";
import {generate_id} from "./_helper.js";

let _dbRef = `scriptorium/users/`;

export function write_data(content, table, uniqueId = '')
{
    app_init().then((app) => {
        const auth = getAuth();
        const database = getDatabase(app);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                let _ref = _dbRef + user.uid + '/' + table + '/';
                if (uniqueId === '') {
                    _ref = _ref + generate_id();
                } else {
                    _ref = _ref + uniqueId;
                }
                set(ref(database, _ref), content);
            }
        });
    });
}

export async function get_data(table, callback)
{
    await app_init().then((app) => {
        const auth = getAuth();
        const database = getDatabase(app);
        onAuthStateChanged(auth, (user) => {
            let dbRef = `${_dbRef}${user.uid}/${table}`;
            let scripts = query(ref(database, dbRef), orderByChild('creationDate'));

            onValue(scripts, (snapshot) => {
                let _return_obj = {};
                snapshot.forEach(child => {
                    _return_obj[child.key] = child.val();
                });
                callback(Object.fromEntries(Object.entries(_return_obj).reverse()));
            });
        });
    });
}