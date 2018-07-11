(() => {

	protractor.ElementArrayFinder.prototype.find = function(labelLocator, data, options) {
		let res;
		switch (typeof data) {
			case 'number':
				{
					if (data === 0) {
						res = this.first();
					} else if (data === -1) {
						res = this.last();
					} else {
						res = this.get(data);
					}
				}
				break;
			case 'string':
				{
					if (!labelLocator) {
						console.warn('Label locator not found');
						res = this.first();
					}
					res = this.filter(item => {
						if (options && options.repeater === true) {
							return item.all(labelLocator).getText().then(arr => {
								// console.log(arr.slice(options.min, options.max + 1).join(', ').toLowerCase());
								return arr.slice(options.min, options.max + 1).join(', ').toLowerCase() === data.toLowerCase();
							})
						} else {
							return item.element(labelLocator).getText().then(text => {
								return text.toLowerCase() === data.toLowerCase();
							});
						}
					}).first();
				}
				break;
			default:
				throw new Error('Data argument must be string or number');
		}
		return res;
	};

	protractor.ElementArrayFinder.prototype.getList = function(labelLocator, options) {
		let res;
		if (options && options.repeater === true) {
			res = this.map(item => {
				return item.getRow(labelLocator, options);
			});
		} else {
			res = this.map(item => {
				return item.getRow(labelLocator);
			});
		}
		return res;
	};

	protractor.ElementFinder.prototype.hasAttribute = function(attribute, attributeValue) {
		return this.getAttribute(attribute).then(resultValues => {
			return resultValues.split(' ').indexOf(attributeValue) !== -1;
		});
	};

	protractor.ElementFinder.prototype.getRow = function(labelLocator, options) {
		if (options && options.repeater === true) {
			return this.all(labelLocator).getText().then(arr => {
				return arr.slice(options.min, options.max + 1).join(', ');
			});
		} else {
			return this.element(labelLocator).getText();
		}
	};

	protractor.ElementFinder.prototype.legacyDropdown = function() {
		let that = this;
		let option = by.css('option');
		let valueOption = function(value) {
			return by.css('option[value="' + value + '"]');
		};

		let toggle = function() {
			that.click();
		};

		let selectByText = function(text) {
			toggle();

			that.all(option).filter(item => {
				return item.getText().then(res => {
					// console.log(res, 'test');
					return res.toLowerCase().trim() === text.toLowerCase().trim();
				});
			}).first().click();
		};

		let selectByValue = function(value) {
			toggle();

			that.element(valueOption(value)).click();
		};

		return {
			selectByText,
			selectByValue
		};
	};

	protractor.ElementFinder.prototype.getNumberFromElementText = function() {
		return this.getText().then(text => {
			return +text.replace(/[^0-9\.-]/g, '');
		});
	};

})();