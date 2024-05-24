import UserModel from "../user/user.model";
import { IPost } from "./post.types";

class PostModel implements IPost {
	id: string;

	post: string;

	createdBy: UserModel;

	constructor({ id, post, createdBy }: IPost) {
		this.id = id;
		this.post = post;
		this.createdBy = createdBy;
	}
}

const createPostModel = (postFromServer: IPost) => {
	const newPost = new PostModel(postFromServer);
	return newPost;
};

export { createPostModel };

export default PostModel;
