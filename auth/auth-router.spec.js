const request = require('supertest');
const server = require('../api/server');

describe('authentication router', () => {
	//
	describe('POST /register', () => {
		it('should return a 201 OK if valid user is created', () => {
			var a = ['Small', 'Blue', 'Ugly'];
			var b = ['Bear', 'Dog', 'Banana'];

			var rA = Math.floor(Math.random() * a.length);
			var rB = Math.floor(Math.random() * b.length);
			var name = a[rA] + b[rB];

			return request(server)
				.post('/api/auth/register')
				.send({
					username: name,
					password: 'password'
				})
				.then(res => {
					expect(res.status).toBe(201);
				});
		});
		it('should respond with a json object', () => {
			var a = ['Small', 'Blue', 'Ugly'];
			var b = ['Bear', 'Dog', 'Banana'];

			var rA = Math.floor(Math.random() * a.length);
			var rB = Math.floor(Math.random() * b.length);
			var name = a[rA] + b[rB];

			return request(server)
				.post('/api/auth/register')
				.send({
					username: name,
					password: 'password'
				})
				.then(res => {
					expect(res.type).toBe('application/json');
				});
		});
	});
	//
	describe('POST /login', () => {
		it.todo('should return a 200 OK if user is logged in');
	});
});
