import { UserSignIn } from './dto/user-sign-in.dto';
import { UserSignUp } from './dto/user-sign-up.dto';
import { User } from './user.entity';

export interface IUsersService {
	createUser: (dto: UserSignUp) => Promise<User | null>;
	validateUser: (dto: UserSignIn) => Promise<boolean>;
}
