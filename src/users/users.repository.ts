import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { COMPONENT_TYPE } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';

import { UserModel } from '@prisma/client';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(COMPONENT_TYPE.PrismaService) private prismaService: PrismaService) {}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}

	async create({ name, email, password }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				name,
				email,
				password,
			},
		});
	}
}
