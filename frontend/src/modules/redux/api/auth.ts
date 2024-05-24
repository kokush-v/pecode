import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_KEYS } from "../../common/consts";
import { LoginAuthData, RegisterAuthData } from "../../common/types/auth/auth.types";
import { userApi } from "./user";
import UserModel from "../../common/types/user/user.model";

export interface AuthResponse {
	data: UserModel;
	access_token: string;
}

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: APP_KEYS.BACKEND_FULL_URL }),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		registerUser: builder.mutation<AuthResponse, RegisterAuthData>({
			invalidatesTags: ["User"],
			query(data) {
				return {
					url: APP_KEYS.BACKEND_KEYS.AUTH.REG,
					method: "POST",
					body: data,
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					localStorage.setItem(APP_KEYS.STORAGE_KEYS.AUTH_TOKEN, data.access_token);
					await dispatch(userApi.endpoints.getUser.initiate(null, { forceRefetch: true }));
				} catch (error) {}
			},
		}),
		loginUser: builder.mutation<AuthResponse, LoginAuthData>({
			invalidatesTags: ["User"],
			query(data) {
				return {
					url: APP_KEYS.BACKEND_KEYS.AUTH.LOGIN,
					method: "POST",
					body: data,
					credentials: "include",
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					localStorage.setItem(APP_KEYS.STORAGE_KEYS.AUTH_TOKEN, data.access_token);
					await dispatch(userApi.endpoints.getUser.initiate(null, { forceRefetch: true }));
				} catch (error) {}
			},
		}),
	}),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
