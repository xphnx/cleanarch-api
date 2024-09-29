import request from 'supertest';
import { App } from '../src/app';
import { boot } from '../src/main';

let application: App;

beforeAll(async () => {
	const { app } = await boot;

	application = app;
});

describe('Users e2e', () => {
	it('Sign Up - error', async () => {
		const result = await request(application.app)
			.post('/users/sign-up')
			.send({ email: 'test@gmail.com', password: 'test-pass', name: 'test-name' });

		expect(result.statusCode).toBe(422);
	});

	it('Sign In - success', async () => {
		const result = await request(application.app)
			.post('/users/sign-in')
			.send({ email: 'test@gmail.com', password: 'test-pass' });

		expect(result.body.token).not.toBeUndefined();
	});

	it('Sign In - error', async () => {
		const result = await request(application.app)
			.post('/users/sign-in')
			.send({ email: 'wrong@gmail.com', password: 'wrong-pass' });

		expect(result.statusCode).toBe(401);
	});

	it('Info - siccess', async () => {
		const login = await request(application.app)
			.post('/users/sign-in')
			.send({ email: 'test@gmail.com', password: 'test-pass' });
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer: ${login.body.token}`);

		expect(result.body.email).toBe('test@gmail.com');
	});

	it('Info - error', async () => {
		await request(application.app)
			.post('/users/sign-in')
			.send({ email: 'test@gmail.com', password: 'test-pass' });

		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', 'Bearer: wrongtoken');

		expect(result.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
