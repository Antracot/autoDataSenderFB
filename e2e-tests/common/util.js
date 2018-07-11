const fs = require('fs');

exports.logToFile = function(filename, dirname, data) {

	organizeObjParam = function(obj){
		return obj;
	};

	let stream = fs.createWriteStream('using_data.log', { flags: 'a' });
	let file = filename.slice(dirname.length + 1);
	// let stream = fs.createWriteStream(file + '.log', { flags: 'a' });

	let content = JSON.stringify(data);

	stream.write('*** Filename: '.concat(file, ' | Date: ', new Date(), ' ***\r\n', organizeObjParam(content), '\r\n'));
};

	