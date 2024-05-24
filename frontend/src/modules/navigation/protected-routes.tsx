import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { ROUTER_KEYS } from "../common/consts/app-keys.const";
import { useSelector } from "react-redux";
import { userSelector } from "../common/components/user/user.selector";

export const ProtectedRoutes = () => {
	const user = useSelector(userSelector);

	const navigate = useNavigate();

	if (user === null) {
		navigate(ROUTER_KEYS.AUTH.LOGIN);
	}

	return <Outlet />;
};
