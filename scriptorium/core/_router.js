import {_routes} from "../config/config.js";
import {_error_routes} from "./_error_routes.js";

export function loadPage()
{
    let routes = navigateTo();

    fetch(`view/${routes['template']}`)
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById('_content');
            container.innerHTML = html; // Inject content into a container

            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.type = script.type;
                newScript.src = script.src;
                newScript.textContent = script.textContent;
                document.getElementsByTagName('body')[0].appendChild(newScript);
                script.remove();
            });

            const toRemove = container.querySelectorAll('meta, title');
            toRemove.forEach(el => {
                el.remove();
            });
        }).catch((error) => {
            //
        });
}

function pushState(route)
{
    history.pushState({ page: window.location.pathname }, "", `/${route}`);
}

function navigateTo() {
    let routes = _routes[window.location.pathname];
    try {
        pushState(routes['name']);
    } catch (error) {
        routes = _error_routes['404'];
        pushState(routes['name']);
    }

    return routes;
}
