import { json } from 'body-parser';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { AuthMiddleware } from './common/auth.middleware';
import { IConfigService } from './config/config.interface';
import { PrismaService } from './database/prisma.service';
import { IExeptionFilter } from './errors/exeption-filter.interface';
import { ILogger } from './logger/logger.interface';
import { UsersController } from './users/users.controller';
import { COMPONENT_TYPE } from './types';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(COMPONENT_TYPE.Logger) private logger: ILogger,
		@inject(COMPONENT_TYPE.UsersController) private usersController: UsersController,
		@inject(COMPONENT_TYPE.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(COMPONENT_TYPE.PrismaService) private prismaService: PrismaService,
		@inject(COMPONENT_TYPE.ConfigService) private configService: IConfigService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());

		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));

		this.app.use(authMiddleware.exec.bind(authMiddleware));
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
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.info(`Server started on http://localhost:${this.port}`);
	}
}
