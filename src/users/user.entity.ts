import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _name: string,
		private readonly _email: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(password: string, salt: string): Promise<void> {
		this._password = await hash(password, Number(salt));
	}

	public async comparePasswords(password: string): Promise<boolean> {
		return compare(password, this._password);
	}
}
