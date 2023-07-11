const migrationsAddIndexes = async (indexes, queryInterface, tableName) => {
	for (const index of indexes) {
      	let tempAttrs = [];
      	for (const field of index['fields']) {
        	tempAttrs.push({attribute: field['name']});
      	}
      	await queryInterface.addIndex(tableName, tempAttrs, {
        	name: index['name'],
        	unique: index['unique'] ? index['unique'] : false
      	});
    }
}

module.exports = {
    migrationsAddIndexes
}