import { inject, injectable } from 'inversify';
import { config, DotenvParseOutput } from 'dotenv';
import { IConfigService } from './config.interface';
import { COMPONENT_TYPE } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(COMPONENT_TYPE.Logger) private logger: ILogger) {
		const parseResult = config();

		if (parseResult.error) {
			this.logger.error('[ConfigService] Failed to read file .env');
		}

		if (parseResult.parsed && Object.keys(parseResult.parsed).length) {
			this.logger.info('[ConfigService] Config loaded');

			this.config = parseResult.parsed;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
