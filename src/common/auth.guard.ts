import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './middleware.interface';

export class AuthGuard implements IMiddleware {
	exec(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}

		res.status(401).send({ message: 'Authorization error!' });
	}
}
