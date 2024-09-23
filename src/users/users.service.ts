import { injectable } from 'inversify';
import { UserSignIn } from './dto/user-sign-in.dto';
import { UserSignUp } from './dto/user-sign-up.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';

import 'reflect-metadata';

@injectable()
export class UsersService implements IUsersService {
	async createUser(dto: UserSignUp): Promise<User | null> {
		const { name, email, password } = dto;
		const user = new User(name, email);
		await user.setPassword(password);

		return null;
	}

	async validateUser(dto: UserSignIn): Promise<boolean> {
		return true;
	}
}
