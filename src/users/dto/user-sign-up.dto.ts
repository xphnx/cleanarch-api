import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSignUp {
	@IsEmail({}, { message: 'Email is incorrect or empty' })
	email: string;

	@IsString({ message: 'Password is incorrect' })
	@IsNotEmpty({ message: 'Password is empty' })
	password: string;

	@IsString({ message: 'Name is incorrect' })
	@IsNotEmpty({ message: 'Name is empty' })
	name: string;
}
