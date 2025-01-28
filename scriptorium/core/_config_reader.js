import {_app_config} from "../config/config.js";

export function setConfigVars()
{
    replacePlaceholdersInHTML();

    function replacePlaceholdersInHTML() {
        // Select all text nodes within the body or specific container (e.g., #content)
        const elements = document.querySelectorAll('*');

        elements.forEach(element => {
            // Regular expression to match {{ key }} inside the text
            const regex = /{{\s*(.*?)\s*}}/g;
            // Replace placeholders with corresponding config values
            element.innerHTML = element.innerHTML.replace(regex, (match, key) => {
                return _app_config[key.trim()] || match; // Return match if key not found
            });
        });
    }
}
