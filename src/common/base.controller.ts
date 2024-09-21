import { Response, Router } from "express";
import { injectable, inject } from "inversify";
import { ControllerRoute } from "./route.interface";
import { Logger } from "../logger/logger.interface";
import { COMPONENT_TYPE } from "../fileTypes";

import 'reflect-metadata';

@injectable()
export abstract class BaseController {
    private readonly _router: Router;

    constructor(@inject(COMPONENT_TYPE.Logger) private logger: Logger) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type('application/json');
        return res.status(code).json(message);
    }

    public ok<T>(res: Response, message: T) {
        return this.send<T>(res, 200, message);
    }

    public created(res: Response) {
        return res.sendStatus(201);
    }

    protected bindRoutes(routes: ControllerRoute[]) {
        for (const route of routes) {
            this.logger.info(`${route.method}: ${route.path}`);
            const handler = route.handler.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
}