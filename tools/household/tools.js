let eById = function(id) {
    return document.getElementById(id);
}
let eByTag = function(tagName) {
    return document.getElementsByTagName(tagName);
}
let eByClass = function(classname) {
    return document.getElementsByClassName(classname);
}
let eQuery = function(query) {
    return document.querySelectorAll(query);
}

HTMLElement.prototype.addClass = function(classname) {
    this.classList.add(classname);
    return this;
};

HTMLElement.prototype.remClass = function(classname) {
    this.classList.remove(classname);
    return this;
};

HTMLElement.prototype.print = function(html) {
    this.innerHTML = html;
    return this;
};

HTMLElement.prototype.copy = function() {
    return this.cloneNode(true)
};

HTMLElement.prototype.insertAfter = function(refNode) {
    refNode.parentNode.insertBefore(this, refNode.nextSibling);
    return this;
};