import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_KEYS } from "../../common/consts";
import UserModel from "../../common/types/user/user.model";
import { setUser } from "../store/userSlice";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: APP_KEYS.BACKEND_FULL_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem(APP_KEYS.STORAGE_KEYS.AUTH_TOKEN);
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		getUser: builder.query<{ data: UserModel }, null>({
			providesTags: ["User"],
			query() {
				return {
					url: APP_KEYS.BACKEND_KEYS.AUTH.USER,
					credentials: "include",
				};
			},

			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const {
						data: { data },
					} = await queryFulfilled;
					console.log(data);
					dispatch(setUser(data));
				} catch (error) {}
			},
		}),
	}),
});

export const { useGetUserQuery } = userApi;
