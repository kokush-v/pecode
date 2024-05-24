import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_KEYS } from "../../common/consts";
import PostModel from "../../common/types/post/post.model";
import { IPostForm } from "../../common/types/post/post.types";
import { addPost, setPosts } from "../store/postSlice";

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fetchBaseQuery({
		baseUrl: APP_KEYS.BACKEND_FULL_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem(APP_KEYS.STORAGE_KEYS.AUTH_TOKEN);
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	tagTypes: ["Posts"],
	endpoints: (builder) => ({
		getPosts: builder.query<PostModel[], null>({
			providesTags: ["Posts"],
			query() {
				return {
					url: APP_KEYS.BACKEND_KEYS.POSTS.ROOT,
					credentials: "include",
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setPosts(data));
				} catch (error) {}
			},
		}),

		createPost: builder.mutation<PostModel, IPostForm>({
			invalidatesTags: ["Posts"],
			query(data) {
				return {
					url: APP_KEYS.BACKEND_KEYS.POSTS.CREATE,
					method: "POST",
					body: data,
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(addPost(data));
				} catch (error) {}
			},
		}),
	}),
});

export const { useGetPostsQuery, useCreatePostMutation } = postApi;
