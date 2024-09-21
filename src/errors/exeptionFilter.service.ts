import { NextFunction, Request, Response } from 'express';
import { Exeption } from './exeption.interface';
import { injectable, inject } from 'inversify';
import { HTTPError } from './http-error.class';
import { Logger } from '../logger/logger.interface';
import { COMPONENT_TYPE } from '../types';

import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements Exeption {
	constructor(@inject(COMPONENT_TYPE.Logger) private logger: Logger) {}
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
