import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	exec(req: Request, res: Response, next: NextFunction): void {
		const token = req.headers.authorization;

		if (token) {
			verify(token.substring(token.indexOf(' ') + 1), this.secret, (error, payload) => {
				if (error) {
					next();
				} else if (payload && typeof payload !== 'string') {
					req.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
