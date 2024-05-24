import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserModel from "../../common/types/user/user.model";

interface IUserState {
	user: UserModel | null;
}

const initialState: IUserState = {
	user: null,
};

const usersSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserModel>) => {
			state.user = action.payload;
		},
		logout: () => initialState,
	},
});

export const { setUser, logout } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
