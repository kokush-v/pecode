import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/auth";
import { userApi } from "../api/user";
import { usersReducer } from "./userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		// Connect the PostApi reducer to the store
		// [postApi.reducerPath]: postApi.reducer,
		userState: usersReducer,
		// postState: postsReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat([
			authApi.middleware,
			userApi.middleware,
			// Add the PostApi middleware to the store
			// postApi.middleware,
		]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
