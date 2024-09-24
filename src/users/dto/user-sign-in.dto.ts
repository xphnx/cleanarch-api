import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSignIn {
	@IsEmail({}, { message: 'Email is incorrect or empty' })
	email: string;

	@IsString({ message: 'Password is incorrect' })
	@IsNotEmpty({ message: 'Password is empty' })
	password: string;
}
