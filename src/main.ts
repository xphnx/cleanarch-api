import { App } from "./app";
import { Exeption } from "./errors/exeption.interface";
import { ExeptionFilter } from "./errors/exeptionFilter.service";
import { COMPONENT_TYPE } from "./fileTypes";
import { Logger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";
import { Container, ContainerModule, interfaces } from "inversify";

import 'reflect-metadata';
import { Users } from "./users/users.controller.interface";

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<App>(COMPONENT_TYPE.Application).to(App);
    bind<Logger>(COMPONENT_TYPE.Logger).to(LoggerService);
    bind<Exeption>(COMPONENT_TYPE.ExeptionFilter).to(ExeptionFilter);
    bind<Users>(COMPONENT_TYPE.Users).to(UsersController);
})

const bootstrap = () => {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(COMPONENT_TYPE.Application);
    app.init();

    return { appContainer, app };
}

export const { app, appContainer } = bootstrap();