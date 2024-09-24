import { User } from './user.entity';

import { UserModel } from '@prisma/client';

export interface IUsersRepository {
	find: (email: string) => Promise<UserModel | null>;
	create: (user: User) => Promise<UserModel>;
}
