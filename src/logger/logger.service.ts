import { Logger as TSLogger } from 'tslog';
import { injectable } from 'inversify';
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
