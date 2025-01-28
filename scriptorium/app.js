import {setConfigVars} from "./core/_config_reader.js";
import {checkAuth} from "./core/_auth_checker.js";

if (document.readyState !== 'loading') {
    // DOMContentLoaded has already fired
    // Execute your code directly here
    setConfigVars();

    // remove trailing slash
    if (window.location.pathname.endsWith('/')) {
        window.history.replaceState(null, null, window.location.pathname.slice(0, -1))
    }
} else {
    document.addEventListener('DOMContentLoaded', () => {
    });
}

checkAuth();
