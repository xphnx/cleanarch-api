import { NextFunction, Request, Response } from 'express';

export interface IExeptionFilter {
	catch: (error: Error, request: Request, response: Response, next: NextFunction) => void;
}
