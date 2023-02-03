class Storage {
	constructor(key) {
		this.storageKey = key;
		this.init();
	}

	init = function() {
		if (!localStorage.getItem(this.storageKey)) {
			localStorage.setItem(this.storageKey, '{}');
		}

		this.storage = this.getData();
	}

	getData = function(key = '') {
		let jsonData = JSON.parse(localStorage.getItem(this.storageKey));
		if (key !== '') {
			if (!jsonData[key]) {
				return [];
			}
			return jsonData[key];
		}
		return jsonData;
	}

	setData = function(data, key = '') {
		if (key !== '') {
			this.storage[key] = data;
		} else {
			this.storage = data;
		}

		return this;
	}

	save = function() {
		localStorage.setItem(this.storageKey, JSON.stringify(this.storage));
	}
}
