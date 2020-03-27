const db = require('../database/dbConfig');

module.exports = {
	insert,
	findById
};

function insert(userInfo) {
	return db('users')
		.insert(userInfo)
		.then(([id]) => {
			return findById(id);
		});
}

function findById(id) {
	return db('users')
		.where({ id })
		.first();
}
