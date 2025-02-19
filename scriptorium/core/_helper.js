export function get_by_id(id)
{
    return document.getElementById(id)
}

export function get_by_class(className, all = false)
{
    if (all) return document.getElementsByClassName(className)
    return document.getElementsByClassName(className)[0]
}

export function get_by_query(selector, all = false)
{
    if (all) return document.querySelectorAll(selector)
    return document.querySelector(selector);
}

export function on(eventType, listener)
{
    return document.addEventListener(eventType, listener);
}

export function redirect_to(route)
{
    return location.replace(route)
}

export function hide_loader()
{
    let loader = get_by_class('loader-wrap')
    if (loader) {
        loader.style.display = 'none'
    }
}

export function generate_id()
{
    return random_string(5);
}

export function random_string(length, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export function get_date_now()
{
    return Math.floor(Date.now() / 1000);
}

export function get_url_parameter(parameter)
{
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

export function _prototypes()
{
    HTMLElement.prototype.on = function (eventType, selector, callback) {
        this.addEventListener(eventType, function (event) {
            if (typeof selector === 'function') {
                selector.call(event.target, event);
                return;
            }

            if (event.target.closest(selector)) {
                callback.call(event.target, event);
            }
        });
    };

    HTMLElement.prototype.find = function (selector, all = false) {
        if (all) return this.querySelectorAll(selector);
        return this.querySelector(selector);
    }
}