import { appConfig } from "../config.js";


export function setConfigVars()
{
    document.querySelectorAll('[data-config]').forEach(function (e) {
        let confKey = e.dataset.config;
        let confVal = appConfig[confKey];
        e.textContent = e.textContent.replace(`{{${confKey}}}`, confVal)
    });
}
