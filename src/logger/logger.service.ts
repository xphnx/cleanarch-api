import { Logger as TSLogger } from 'tslog';
import { injectable } from "inversify";
import { Logger } from './logger.interface';

import 'reflect-metadata';

@injectable()
export class LoggerService implements Logger {
    logger: TSLogger;

    constructor() {
        this.logger = new TSLogger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFunctionName: false,
            displayFilePath: 'hidden',
        });
    }

    info(...args: unknown[]) {
        this.logger.info(...args);
    }

    error(...args: unknown[]) {
        this.logger.error(...args);
    }

    warn(...args: unknown[]) {
        this.logger.warn(...args);
    }
}