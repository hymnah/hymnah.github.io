import {get_by_query} from "./_helper.js";

export function _reset_form()
{
    let formFields = get_by_query('form input, form textarea', true)

    for (let i in formFields) {
        if (formFields[i] instanceof HTMLElement) {
            formFields[i].value = '';
        }
    }
}