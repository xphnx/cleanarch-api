import { NextFunction, Request, Response, Router } from 'express';

export interface IMiddleware {
	exec: (req: Request, res: Response, next: NextFunction) => void;
}
