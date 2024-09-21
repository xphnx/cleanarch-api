import { App } from './app';
import { Exeption } from './errors/exeption.interface';
import { ExeptionFilter } from './errors/exeptionFilter.service';
import { COMPONENT_TYPE } from './types';
import { Logger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { Container, ContainerModule, interfaces } from 'inversify';

import 'reflect-metadata';
import { Users } from './users/users.controller.interface';

interface BootstrapReturn {
	appContainer: Container;
	app: App;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(COMPONENT_TYPE.Application).to(App);
	bind<Logger>(COMPONENT_TYPE.Logger).to(LoggerService);
	bind<Exeption>(COMPONENT_TYPE.ExeptionFilter).to(ExeptionFilter);
	bind<Users>(COMPONENT_TYPE.Users).to(UsersController);
});

const bootstrap = (): BootstrapReturn => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(COMPONENT_TYPE.Application);
	app.init();

	return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
