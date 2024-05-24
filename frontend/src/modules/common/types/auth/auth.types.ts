export interface AuthData {
	email: string;
	name: string;
	password: string;
	token: string;
}

export interface LoginAuthData extends Omit<AuthData, "token" | "name"> {}
export interface RegisterAuthData extends Omit<AuthData, "token"> {}
