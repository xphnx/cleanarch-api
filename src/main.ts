import { App } from './app';
import { IExeptionFilter } from './errors/exeption-filter.interface';
import { ExeptionFilter } from './errors/exeption-filter.service';
import { COMPONENT_TYPE } from './types';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { IUsersController } from './users/users.controller.interface';
import { Container, ContainerModule, interfaces } from 'inversify';

import 'reflect-metadata';
import { IUsersService } from './users/users.service.interface';
import { UsersService } from './users/users.service';
import { IConfigService } from './config/config.interface';
import { ConfigService } from './config/config.service';

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
});

const bootstrap = (): BootstrapReturn => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(COMPONENT_TYPE.Application);
	app.init();

	return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
