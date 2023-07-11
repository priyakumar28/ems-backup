const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const middlewares = {};

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		let fileName = path.parse(file).name;
		const middleware = require(`${__dirname}/${fileName}`);
		middlewares[fileName] = middleware;
	});

module.exports = middlewares;