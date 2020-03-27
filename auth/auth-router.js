const router = require('express').Router();
const User = require('./auth-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../secrets/secrets.js');

router.post('/register', (req, res) => {
	const newUser = req.body;

	const hash = bcrypt.hashSync(newUser.password, 8);

	newUser.password = hash;

	User.insert(newUser)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			res.status(500).json({ error: 'issue creating user', err });
		});
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	User.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);

				res.status(200).json({ message: 'Logged in!', token: token });
			} else {
				res.status(401).json({ message: 'Invalid credentials.' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'issue logging in.', err });
		});
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
