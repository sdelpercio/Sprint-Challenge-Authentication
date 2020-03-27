const db = require('../database/dbConfig');

module.exports = {
	insert,
	findById,
	findBy
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

function findBy(filter) {
	return db('users').where(filter);
}
