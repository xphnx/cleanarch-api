import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.interface';
import { COMPONENT_TYPE } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { UsersService } from './users.service';
import { IUsersService } from './users.service.interface';

import { UserModel } from '@prisma/client';

const configServiceMock: IConfigService = {
	get: jest.fn(),
};

const usersRepositoryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container: Container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(() => {
	container.bind<IUsersService>(COMPONENT_TYPE.UsersService).to(UsersService);
	container.bind<IConfigService>(COMPONENT_TYPE.ConfigService).toConstantValue(configServiceMock);
	container
		.bind<IUsersRepository>(COMPONENT_TYPE.UsersRepository)
		.toConstantValue(usersRepositoryMock);

	configService = container.get<IConfigService>(COMPONENT_TYPE.ConfigService);
	usersRepository = container.get<IUsersRepository>(COMPONENT_TYPE.UsersRepository);
	usersService = container.get<IUsersService>(COMPONENT_TYPE.UsersService);
});

let createdUser: UserModel | null;

describe('Users Service', () => {
	it('Create User', async () => {
		configService.get = jest.fn().mockReturnValueOnce(1);
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);

		createdUser = await usersService.createUser({
			email: 'xphnx@ya.ru',
			name: 'xphnx',
			password: '13',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('13');
	});

	it('Success validate User', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const result = await usersService.validateUser({
			email: 'xphnx@ya.ru',
			password: '13',
		});

		expect(result).toBeTruthy();
	});

	it('Wrong password validate User', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const result = await usersService.validateUser({
			email: 'xphnx@ya.ru',
			password: '13?',
		});

		expect(result).toBeFalsy();
	});

	it('Not found validate User', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);

		const result = await usersService.validateUser({
			email: 'xphnx@ya.ru',
			password: '13?',
		});

		expect(result).toBeFalsy();
	});
});
