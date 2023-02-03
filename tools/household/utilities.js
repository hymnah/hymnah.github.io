class Pages {
	
	constructor() {
		this.pages = [];
		this.initPage = 'init-page';
		this.storage;
	}

	setStorage(storage) {
		if (!storage instanceof Storage) {
			console.error('Instance of class Storage is required');
			return false;
		}

		this.storage = storage;
		return this;
	}

	setControls(elems) {
		let pages = this.pages;
		let storage = this.storage;
		let iPage = this.initPage;
		let currPage = storage.getData('page')['cp'] || iPage;
	
		for (let i in elems) {
			let eachElem = elems[i];
			if (eachElem instanceof HTMLElement) {
				pages.push(eachElem.dataset['pageTarget']);

				eachElem.onclick = function(e) {

					let curTrgt = e.currentTarget;
					let pgTrgt = curTrgt.dataset['pageTarget'];
					let eachPage = document.getElementsByClassName('page ' + pgTrgt)[0];
					let initPage = document.getElementsByClassName('page ' + iPage)[0];

					if (!eachElem.classList.contains('back')) {

						for (let ii in elems) {
							if (elems[ii] instanceof HTMLElement) {
								if (!elems[ii].classList.contains('back')) {
									elems[ii].classList.add('hidden');
								} else {
									elems[ii].classList.remove('hidden');
								}
							}
						}
						
						initPage.classList.add('hidden');
						eachPage.classList.remove('hidden');
					} else {

						for (let ii in elems) {
							if (elems[ii] instanceof HTMLElement) {
								if (!elems[ii].classList.contains('back')) {
									elems[ii].classList.remove('hidden');
									let eachPage = document.getElementsByClassName('page ' + elems[ii].dataset['pageTarget'])[0];
									eachPage.classList.add('hidden');
								} else {
									elems[ii].classList.add('hidden');

								}
							}
						}

						initPage.classList.remove('hidden');						
					}

					storage
					.setData({cp:pgTrgt}, 'page')
					.save();

				}

				let pgTrgt = eachElem.dataset['pageTarget'];

				if (pgTrgt == currPage) {
					eachElem.classList.add('hidden');	
				} else {
					eachElem.classList.remove('hidden');
				}

				if (currPage != iPage) {
					if (!eachElem.classList.contains('back')) {
						eachElem.classList.add('hidden');
					}
				}
			}
		}


		for (let i in pages) {
			let eachPage = document.getElementsByClassName('page ' + pages[i])[0];
			if (pages[i] == currPage) {
				eachPage.classList.remove('hidden');
			} else {
				eachPage.classList.add('hidden');
			}
		}
	}
	
}

let eById = function(id) {
	return document.getElementById(id);
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

HTMLElement.prototype.insert = function(html) {
	this.append(html);
	return this;
};

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}
