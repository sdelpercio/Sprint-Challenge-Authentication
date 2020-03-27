const router = require('express').Router();
const User = require('./auth-model');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../secrets/secrets.js');

router.post('/register', (req, res) => {
	const newUser = req.body;

	User.insert(newUser)
		.then(user => {
			if (user) {
				const token = generateToken(user);

				res.status(201).json({ message: 'Welcome!', token: token });
			} else {
				res.status(500).json({ error: 'error, no user' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'issue creating user', err });
		});
});

router.post('/login', (req, res) => {
	// implement login
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username
	};

	const options = {
		expiresIn: '8h'
	};

	return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
