import {app_init, getAuth, onAuthStateChanged, signOut} from "./_firebase_src.js";
import {get_by_id, hide_loader, redirect_to} from "./_helper.js";
import {_routes} from "../config/config.js";

export function checkAuth()
{
    app_init().then(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                if (location.pathname === '' ||
                    location.pathname === _routes['route_login']['path'] ||
                    location.pathname === _routes['route_signup']['path'] ||
                    location.pathname === _routes['route_verify']['path']
                ) {
                    redirect_to(_routes['route_home']['path']);
                    return;
                }
            } else {
                if (location.pathname !== _routes['route_login']['path'] &&
                    location.pathname !== _routes['route_signup']['path'] &&
                    location.pathname !== _routes['route_verify']['path']
                ) {
                    redirect_to(_routes['route_login']['path']);
                    return;
                }
            }
            hide_loader();
        });

        let _logout = get_by_id('_logout');
        if (_logout) {
            _logout.onclick = function () {
                signOut(auth).then(() => {
                    redirect_to(_routes['route_login']['path']);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    });

}


