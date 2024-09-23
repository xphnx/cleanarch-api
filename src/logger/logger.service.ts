import { Logger } from 'tslog';
import { injectable } from 'inversify';
import { ILogger } from './logger.interface';

import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFunctionName: false,
			displayFilePath: 'hidden',
		});
	}

	info(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
