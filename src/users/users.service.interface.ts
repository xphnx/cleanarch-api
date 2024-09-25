import { UserSignIn } from './dto/user-sign-in.dto';
import { UserSignUp } from './dto/user-sign-up.dto';

import { UserModel } from '@prisma/client';

export interface IUsersService {
	createUser: (dto: UserSignUp) => Promise<UserModel | null>;
	validateUser: (dto: UserSignIn) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
}
