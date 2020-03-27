const request = require('supertest');
const server = require('../api/server');

describe('jokes router', () => {
	describe('GET /api/jokes', () => {
		it('should return a message if the wrong token is sent', () => {
			return request(server)
				.get('/api/jokes')
				.set(
					'Authorization',
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo3LCJ1c2VybmFtZSI6ImJlY2t5IiwiaWF0IjoxNTg1MzMwMDA5LCJleHAiOjE1ODUzNTg4MDl9.ImYBfrZ03ukLJB5dD9qhPF9cXa2KWFWcAa372wfW_lgZZ'
				)
				.then(res => {
					expect(res.body.message).toBe('You shall not pass!');
				});
		});
		it('should return an array of jokes if authorized', () => {
			return request(server)
				.get('/api/jokes')
				.set(
					'Authorization',
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo3LCJ1c2VybmFtZSI6ImJlY2t5IiwiaWF0IjoxNTg1MzMwMDA5LCJleHAiOjE1ODUzNTg4MDl9.ImYBfrZ03ukLJB5dD9qhPF9cXa2KWFWcAa372wfW_lg'
				)
				.then(res => {
					expect(Array.isArray(res.body.jokes)).toBe(true);
				});
		});
	});
});
