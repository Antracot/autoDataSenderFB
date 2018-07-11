'use strict';

const PtorExtend = require('../common/protractor.extend');
const BasePage = require('../common/base.po.js');

const SendData = function() {

	let that = this;
	let nameOfUSer = by.css('#globalContainer ._673w h2 span');
	let toFriendBtn = by.css('#pagelet_timeline_profile_actions .FriendRequestAdd');
	let messageInp = by.css('div[aria-label="New message"] div[aria-label="Type a message..."]');
	let textArr = [
		'Якщо тебе цікавить ІТ ця новина саме для тебе!',
		'Найбільш очікуваний QA івент цього літа вже скоро.',
		'Своїм досвідом з вами поділяться:',
		' - Сергій Дідик (Devlight) "Як бути, коли ти QA на великому проекті?!";',
		' - Ольга Арабчук (SoftServe) "Як пройти мануальне та автоматизоване тестування та стати Джавісткою";',
		' - Іванка Курпіл (SoftServe) "Тестування API для початківців" або ж "Don\'t be afraid of the API, newcomer!:)";',
		'Приходь, слухай, спілкуйся та вчися новому.',
		'07 липня, Університет Короля Данила, вхід вільний!!!\n'
		];
	let linkEvent = 'https://www.facebook.com/events/636048253412516/';

	this.editingWrongUrl = function(dataUrl){
		let cuttedUrl = dataUrl.split('=');
		return cuttedUrl[cuttedUrl.length-1];
	};

	this.goInMessager = function(url){
		let myUrl = url.split('/');
		let subUrl = myUrl[myUrl.length-1];
		let cutUrl = subUrl.slice(0, 7);
		let goInMassenger = 'https://www.facebook.com/messages/t/' + subUrl;
			if(cutUrl=='profile'){
				let editedUrl = that.editingWrongUrl(subUrl);
				goInMassenger = 'https://www.facebook.com/messages/t/' + editedUrl;
				browser.get(goInMassenger);
			} else{
				browser.get(goInMassenger);
			}
		that.freeze('l');
	};

	this.infoSender = function(data){
		that.getTextElem(nameOfUSer).then(function (text) {
			let splitName = text.split(" ");
			element(messageInp).sendKeys('Привіт, ' + splitName[0] + '!');
			that.hitShiftEnter();
		});
		that.freeze('s');
		textArr.forEach(function(item, i, arr) {
			if(i<textArr.length){
				element(messageInp).sendKeys(item);
				that.freeze('s');
				that.hitShiftEnter();
			}else{
				element(messageInp).sendKeys(item);
			}
		});
		element(messageInp).sendKeys(linkEvent);
		that.freeze('l');
		that.hitEnter();
		that.freeze('l');
	};
	

};
SendData.prototype = BasePage;
module.exports = SendData;