'use strict';

const PtorExtend = require('../common/protractor.extend');
const BasePage = require('../common/base.po.js');

const AuthPage = function() {

	let that = this;
	let pageTitle = by.css('title');
	let logInBtn = by.css('#loginbutton');
	let headerMenuBtn = by.css('#pageLoginAnchor');
	let logOutBtn = by.css('.uiScrollableAreaContent ul[role="menu"] li:last-child');

	this.getTitle = function(){
		return that.getPageTitle();
	};

	this.logIn = function(data){
		that.freeze('m');
		that.fillInputQues(data);
		that.freeze('m');
		element(logInBtn).click();
		that.freeze('m');
	};

	this.openMenu = function(){
		element(headerMenuBtn).click();
	}; 

	this.logOut = function(){
		browser.get('https://facebook.com');
		this.openMenu();
		that.freeze('m');
		element(logOutBtn).click();
	};



	
};
AuthPage.prototype = BasePage;
module.exports = AuthPage;