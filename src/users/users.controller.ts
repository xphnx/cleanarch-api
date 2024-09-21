import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { injectable, inject } from 'inversify';
import { Logger } from '../logger/logger.interface';
import { COMPONENT_TYPE } from '../types';

import 'reflect-metadata';
import { Users } from './users.controller.interface';

@injectable()
export class UsersController extends BaseController implements Users {
	constructor(@inject(COMPONENT_TYPE.Logger) logger: Logger) {
		super(logger);
		this.bindRoutes([
			{ path: '/sign-in', method: 'post', handler: this.signIn },
			{ path: '/sign-up', method: 'post', handler: this.signUp },
		]);
	}

	signIn(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'Sign In');
	}

	signUp(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'Sign Up');
	}
}
