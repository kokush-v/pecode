import { IUser } from "./user.types";

class UserModel implements IUser {
	id: string;

	email: string;

	name: string;

	constructor(id: string, email: string, name: string) {
		this.id = id;
		this.email = email;
		this.name = name;
	}
}

const createUserModel = (userFromServer: UserModel) =>
	new UserModel(userFromServer.id, userFromServer.email, userFromServer.name);

export { createUserModel };

export default UserModel;
