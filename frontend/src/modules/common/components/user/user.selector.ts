import { RootState } from "../../../redux/store/store";

export const userSelector = (state: RootState) => state.userState.user;
