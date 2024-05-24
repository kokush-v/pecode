import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PostModel from "../../common/types/post/post.model";

interface PostsState {
	posts: PostModel[];
}

const initialState: PostsState = {
	posts: [],
};

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setPosts: (state, action: PayloadAction<PostModel[]>) => {
			state.posts = action.payload;
		},
		addPost: (state, action: PayloadAction<PostModel>) => {
			state.posts.push(action.payload);
		},
	},
});

export const { setPosts, addPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
