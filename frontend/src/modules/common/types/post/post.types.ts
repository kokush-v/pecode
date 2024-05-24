import UserModel from "../user/user.model";

export interface IPost {
	id: string;
	post: string;
	createdBy: UserModel;
}

export interface IPostForm extends Omit<IPost, "id" | "createdBy"> {}
