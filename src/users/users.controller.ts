import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { injectable, inject } from 'inversify';
import { Logger } from '../logger/logger.interface';
import { COMPONENT_TYPE } from '../types';

import 'reflect-metadata';
import { Users } from './users.controller.interface';
import { UserSignIn } from './dto/user-sign-in.dto';
import { UserSignUp } from './dto/user-sign-up.dto';

@injectable()
export class UsersController extends BaseController implements Users {
	constructor(@inject(COMPONENT_TYPE.Logger) logger: Logger) {
		super(logger);
		this.bindRoutes([
			{ path: '/sign-in', method: 'post', handler: this.signIn },
			{ path: '/sign-up', method: 'post', handler: this.signUp },
		]);
	}

	signIn(req: Request<{}, {}, UserSignIn>, res: Response, next: NextFunction): void {
		console.info(req.body);
		this.ok(res, 'Sign In');
	}

	signUp(req: Request<{}, {}, UserSignUp>, res: Response, next: NextFunction): void {
		this.ok(res, 'Sign Up');
	}
}
