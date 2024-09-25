import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.interface';
import { COMPONENT_TYPE } from '../types';
import { UserSignIn } from './dto/user-sign-in.dto';
import { UserSignUp } from './dto/user-sign-up.dto';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { IUsersService } from './users.service.interface';

import { UserModel } from '@prisma/client';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(COMPONENT_TYPE.ConfigService) private configService: IConfigService,
		@inject(COMPONENT_TYPE.UsersRepository) private usersRepository: IUsersRepository,
	) {}

	async createUser(dto: UserSignUp): Promise<UserModel | null> {
		const { name, email, password } = dto;
		const user = new User(name, email);
		const salt = this.configService.get('SALT');

		await user.setPassword(password, salt);

		const existedUser = await this.usersRepository.find(email);

		if (existedUser) {
			return null;
		}

		return this.usersRepository.create(user);
	}

	async validateUser(dto: UserSignIn): Promise<boolean> {
		const { email, password } = dto;
		const existedUser = await this.usersRepository.find(email);

		if (!existedUser) {
			return false;
		}

		const user = new User(existedUser.name, existedUser.email, existedUser.password);

		return user.comparePasswords(password);
	}
}
