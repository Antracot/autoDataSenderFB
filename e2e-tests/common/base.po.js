'use strict';

const ProtractorExtend = require('./protractor.extend');

const BasePage = function() {

	 let that = this;

	this.at = function() {
		return browser.wait(this.pageLoaded, this.timeout.xl);
	};

	this.visit = function() {
		browser.setLocation(this.url);
	};

	this.getCurrentUrl = function() {
		return browser.getCurrentUrl();
	};

	var EC = protractor.ExpectedConditions;

	this.isVisible = function(locator) {
		return (EC.visibilityOf(locator))();
	};

	this.isNotVisible = function(locator) {
		return (EC.invisibilityOf(locator))();
	};

	this.inDom = function(locator) {
		return (EC.presenceOf(locator))();
	};

	this.notInDom = function(locator) {
		return (EC.stalenessOf(locator))();
	};

	this.isClickable = function(locator) {
		return (EC.elementToBeClickable(locator))();
	};

	this.hasText = function(locator, text) {
		return (EC.textToBePresentInElement(locator, text))();
	};

	this.and = function(arrayOfFunctions) {
		return (EC.and(arrayOfFunctions))();
	};

	this.titleIs = function(title) {
		return (EC.titleIs(title))();
	};

	this.urlIs = function(url) {
		return (EC.urlIs(url))();
	};

	this.urlContains = function(partialUrl) {
		return (EC.urlContains(partialUrl))();
	};

	this.acceptAlert = function() {
		browser.wait(EC.alertIsPresent(), this.timeout.s);
		browser.switchTo().alert().accept();
	};

	this.hitEnter = function() {
		return browser.actions().sendKeys(protractor.Key.ENTER).perform();
	};
	
	this.hitEscape = function() {
		return browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
	};

	this.hitTab = function() {
		return browser.actions().sendKeys(protractor.Key.TAB).perform();
	};

	this.hitShiftEnter = function(){
		return browser.actions().sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ENTER)).perform();
	};

	this.timeout = {
		'xs': 300,
		's' : 1000,
		'm' : 2000,
		'l' : 5000,
		'xl': 9000,
		'xxl': 15000
	};

	this.freeze = function(label) {
		let time;

		switch(label) {
			case 's': 
				time = this.timeout.s;
				break;
			case 'm':
				time = this.timeout.m;
				break;
			case 'l':
				time = this.timeout.l;   
				break;
			case 'xl':
				time = this.timeout.xl;   
				break;
			case 'xxl':
				time = this.timeout.xxl;   
				break;		
			default:
				time = this.timeout.s;
		}

		browser.sleep(time);
	};

	this.getTextElem = function(locator){
		return element(locator).getText();
	};
	this.moveTo = function(locator){
		browser.actions().mouseMove(element(locator)).perform();
	};

	this.getPageTitle = function(){
		return browser.getTitle();
	};

	this.fillSelectQues = function(data){
		if('object' !== typeof data) {
			throw new Error ('Function argument should be an object');
		} else {
			Object.keys(data).forEach(key => {
				$(key).isPresent().then(function (result){
					if(result){
						$(key).isDisplayed().then(function (isVisible) {
							if(isVisible){
								$(key).legacyDropdown().selectByText(data[key]);
							}
						});
					}	
				});

			});
		}
	};

	this.fillInputQues = function(data){
		if('object' !== typeof data) {
			throw new Error ('Function argument should be an object');
		} else {
			Object.keys(data).forEach(key => {
				$(key).isDisplayed().then(function (isVisible) {
					if(isVisible){
						$(key).clear().sendKeys(data[key]);
					}
				});
			});
		}
	};

	this.checkBox = function(idsArray) {
		idsArray.forEach((element) => {
				$(element).click();
			});
		return this;
	};

	this.alertBlock = {
		container: by.css('.alert-success-new'),

		isAlertShown: function() {
			return that.inDom(this.container);
		},
		getMessage: function() {
			return element(this.container).element(by.css('.alert_msg')).getText();
		},
		getStatus: function() {
			return element(this.container).element(by.css('.alert_title')).getText();
		}		
	};

};

module.exports = new BasePage();


// page.clientRowName.getText().then(function (text) {
//     console.log(text);
// });