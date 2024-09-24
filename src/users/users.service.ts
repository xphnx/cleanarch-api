import { injectable, inject } from 'inversify';
import { UserSignIn } from './dto/user-sign-in.dto';
import { UserSignUp } from './dto/user-sign-up.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import { COMPONENT_TYPE } from '../types';
import { IConfigService } from '../config/config.interface';

import 'reflect-metadata';

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(COMPONENT_TYPE.ConfigService) private configService: IConfigService) {}

	async createUser(dto: UserSignUp): Promise<User | null> {
		const { name, email, password } = dto;
		const user = new User(name, email);
		const salt = this.configService.get('SALT');

		await user.setPassword(password, salt);
		return null;
	}

	async validateUser(dto: UserSignIn): Promise<boolean> {
		return true;
	}
}
