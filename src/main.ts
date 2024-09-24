import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { IConfigService } from './config/config.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IExeptionFilter } from './errors/exeption-filter.interface';
import { ExeptionFilter } from './errors/exeption-filter.service';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { IUsersController } from './users/users.controller.interface';
import { UsersRepository } from './users/users.repository';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersService } from './users/users.service';
import { IUsersService } from './users/users.service.interface';
import { App } from './app';
import { COMPONENT_TYPE } from './types';

interface BootstrapReturn {
	appContainer: Container;
	app: App;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(COMPONENT_TYPE.Application).to(App);
	bind<IExeptionFilter>(COMPONENT_TYPE.ExeptionFilter).to(ExeptionFilter);
	bind<IUsersController>(COMPONENT_TYPE.UsersController).to(UsersController);
	bind<IUsersService>(COMPONENT_TYPE.UsersService).to(UsersService);
	bind<ILogger>(COMPONENT_TYPE.Logger).to(LoggerService).inSingletonScope();
	bind<IConfigService>(COMPONENT_TYPE.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(COMPONENT_TYPE.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(COMPONENT_TYPE.UsersRepository).to(UsersRepository).inSingletonScope();
});

const bootstrap = (): BootstrapReturn => {
	const appContainer = new Container();

	appContainer.load(appBindings);

	const app = appContainer.get<App>(COMPONENT_TYPE.Application);

	app.init();

	return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
