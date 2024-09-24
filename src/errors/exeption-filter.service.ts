import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { COMPONENT_TYPE } from '../types';
import { IExeptionFilter } from './exeption-filter.interface';
import { HTTPError } from './http-error.class';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(COMPONENT_TYPE.Logger) private logger: ILogger) {}

	catch(error: Error | HTTPError, request: Request, response: Response, next: NextFunction): void {
		if (error instanceof HTTPError) {
			this.logger.error(`[${error.context}] Ошибка ${error.statusCode}: ${error.message}`);
			response.status(error.statusCode).send({ error: error.message });
		} else {
			this.logger.error(error.message);
			response.status(500).send({ error: error.message });
		}
	}
}
