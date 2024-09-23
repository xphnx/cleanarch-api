import express, { Express } from 'express';
import { Server } from 'http';
import { UsersController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { injectable, inject } from 'inversify';
import { COMPONENT_TYPE } from './types';
import { json } from 'body-parser';

import 'reflect-metadata';
import { ExeptionFilter } from './errors/exeption-filter.service';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(COMPONENT_TYPE.Logger) private logger: ILogger,
		@inject(COMPONENT_TYPE.UsersController) private usersController: UsersController,
		@inject(COMPONENT_TYPE.ExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRouter(): void {
		this.app.use('/users', this.usersController.router);
	}

	useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRouter();
		this.useExeptionFilter();
		this.server = this.app.listen(this.port);
		this.logger.info(`Server started on http://localhost:${this.port}`);
	}
}
