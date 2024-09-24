import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { COMPONENT_TYPE } from '../types';
import { IUsersController } from './users.controller.interface';
import { UserSignIn } from './dto/user-sign-in.dto';
import { UserSignUp } from './dto/user-sign-up.dto';
import { HTTPError } from '../errors/http-error.class';
import { ValidateMiddleware } from '../common/validate.middleware';
import { IUsersService } from './users.service.interface';

import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(COMPONENT_TYPE.Logger) private loggerService: ILogger,
		@inject(COMPONENT_TYPE.UsersService) private usersService: IUsersService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/sign-in',
				method: 'post',
				handler: this.signIn,
				middlewares: [new ValidateMiddleware(UserSignIn)],
			},
			{ path: '/sign-up', method: 'post', handler: this.signUp },
		]);
	}

	signIn(req: Request<{}, {}, UserSignIn>, res: Response, next: NextFunction): void {
		this.ok(res, 'Sign In');
	}

	async signUp(req: Request<{}, {}, UserSignUp>, res: Response, next: NextFunction): Promise<void> {
		const user = await this.usersService.createUser(req.body);
		if (!user) {
			return next(new HTTPError(422, 'Such a user exists!'));
		}
		this.ok(res, { email: user.email });
	}
}
