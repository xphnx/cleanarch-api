import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { COMPONENT_TYPE } from '../types';
import { UserSignIn } from './dto/user-sign-in.dto';
import { UserSignUp } from './dto/user-sign-up.dto';
import { IUsersController } from './users.controller.interface';
import { IUsersService } from './users.service.interface';

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
			{
				path: '/sign-up',
				method: 'post',
				handler: this.signUp,
				middlewares: [new ValidateMiddleware(UserSignUp)],
			},
		]);
	}

	async signIn(req: Request<{}, {}, UserSignIn>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.usersService.validateUser(req.body);

		if (!result) {
			return next(new HTTPError(401, 'Validation error'));
		}

		this.ok(res, {});
	}

	async signUp(req: Request<{}, {}, UserSignUp>, res: Response, next: NextFunction): Promise<void> {
		const user = await this.usersService.createUser(req.body);

		if (!user) {
			return next(new HTTPError(422, 'Such a user exists!'));
		}

		this.ok(res, { email: user.email, id: user.id });
	}
}
