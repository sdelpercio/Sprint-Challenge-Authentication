const request = require('supertest');
const server = require('../api/server');

describe('authentication router', () => {
	//
	describe('POST /register', () => {
		it('should return a 201 OK if valid user is created', () => {
			return request(server)
				.post('/api/auth/register')
				.send({
					username: Math.random(),
					password: 'password'
				})
				.then(res => {
					expect(res.status).toBe(201);
				});
		});
		it('should respond with a json object', () => {
			return request(server)
				.post('/api/auth/register')
				.send({
					username: Math.random(),
					password: 'password'
				})
				.then(res => {
					expect(res.type).toBe('application/json');
				});
		});
	});
	//
	describe('POST /login', () => {
		it('should return a 200 OK if user is logged in', () => {
			return request(server)
				.post('/api/auth/login')
				.send({
					username: 'becky',
					password: 'becky'
				})
				.then(res => {
					expect(res.status).toBe(200);
				});
		});
		it('should return a logged in message in json', () => {
			return request(server)
				.post('/api/auth/login')
				.send({
					username: 'becky',
					password: 'becky'
				})
				.then(res => {
					expect(res.body.message).toBe('Logged in!');
				});
		});
		it('should return an error message of invalid credentials with wrong password', () => {
			return request(server)
				.post('/api/auth/login')
				.send({
					username: 'becky',
					password: 'beckyyyy'
				})
				.then(res => {
					expect(res.body.message).toBe('Invalid credentials.');
				});
		});
	});
});
