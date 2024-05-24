// Local storage keys
export const STORAGE_KEYS = {
	JWT_TOKEN_STUDENT: "JWT_TOKEN_STUDENT",
	JWT_TOKEN_INSTRUCTOR: "JWT_TOKEN_INSTRUCTOR",
	ADDRESS: "ADDRESS",
	AUTH_TOKEN: "AUTH-TOKEN",
};

// React-query keys
export const QUERY_KEYS = {
	POSTS: "posts",
	USER: "user",
	SORT: "sort",
};

// Backend Routes
export const BACKEND_KEYS = {
	SERVER_URL: "http://127.0.0.1:3001",
	API_VERSION: "/api/v1",
	POSTS: {
		ROOT: "posts",
		CREATE: "posts/create",
	},
	AUTH: {
		REG: "auth/register",
		LOGIN: "auth/login",
		USER: "auth/user",
	},
};

export const BACKEND_FULL_URL = BACKEND_KEYS.SERVER_URL + BACKEND_KEYS.API_VERSION;

export const ROUTER_KEYS = {
	HOME: "/home",
	AUTH: {
		ROOT: "/auth",
		LOGIN: "/auth/login",
		SIGN_UP: "/auth/register",
	},
};

export const ERRORS = {
	USER_EXIST: "User already exist",
	USER_NOT_EXIST: "User not exist, create account",
	INCORRECT_PASSWORD: "Incorrect password",
	UNAUTHORIZED: "Please login",
};

export const ENV = {
	REACT_APP_SITE_KEY: process.env.REACT_APP_SITE_KEY as string,
};
