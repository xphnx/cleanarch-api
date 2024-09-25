import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import { AuthGuard } from '../common/auth.guard';
import { BaseController } from '../common/base.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import { IConfigService } from '../config/config.interface';
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
		@inject(COMPONENT_TYPE.ConfigService) private configService: IConfigService,
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
			{
				path: '/info',
				method: 'get',
				handler: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async signIn(req: Request<{}, {}, UserSignIn>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.usersService.validateUser(req.body);

		if (!result) {
			return next(new HTTPError(401, 'Validation error'));
		}

		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));

		this.ok(res, { token: jwt });
	}

	async signUp(req: Request<{}, {}, UserSignUp>, res: Response, next: NextFunction): Promise<void> {
		const user = await this.usersService.createUser(req.body);

		if (!user) {
			return next(new HTTPError(422, 'Such a user exists!'));
		}

		this.ok(res, { email: user.email, id: user.id });
	}

	async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		const userInfo = await this.usersService.getUserInfo(req.user);

		this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(error, token) => {
					if (error) {
						reject(error);
					}

					resolve(token as string);
				},
			);
		});
	}
}
