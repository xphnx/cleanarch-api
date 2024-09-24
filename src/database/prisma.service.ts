import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { COMPONENT_TYPE } from '../types';

import { PrismaClient } from '@prisma/client';

@injectable()
export class PrismaService {
	public client: PrismaClient;

	constructor(@inject(COMPONENT_TYPE.Logger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.info('[PrismaService] Succesful connection!');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error('[PrismaService] Connection failed: ' + error.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
