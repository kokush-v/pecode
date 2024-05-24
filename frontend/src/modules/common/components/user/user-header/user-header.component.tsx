import { Button, HStack, Heading, Skeleton } from "@chakra-ui/react";
import { useNavigate } from "react-router";

import { QUERY_KEYS, ROUTER_KEYS, STORAGE_KEYS } from "../../../consts/app-keys.const";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../user.selector";
import { logout } from "../../../../redux/store/userSlice";

export const UserHeader = () => {
	const navigate = useNavigate();
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	/* eslint-disable */
	return (
		<div className="p-3">
			{user ? (
				<HStack justifyContent={"space-between"} w={"100%"} padding={"0 1em"}>
					<Heading as="h1">{user.name}</Heading>
					<HStack>
						<Button
							colorScheme="red"
							onClick={() => {
								localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
								dispatch(logout());
								navigate(ROUTER_KEYS.AUTH.LOGIN);
							}}>
							LOG OUT
						</Button>
					</HStack>
				</HStack>
			) : (
				<HStack className="justify-end">
					<Button colorScheme="green" onClick={() => navigate(ROUTER_KEYS.AUTH.LOGIN)}>
						LOGIN
					</Button>
					<Button
						colorScheme="green"
						variant={"outline"}
						onClick={() => navigate(ROUTER_KEYS.AUTH.SIGN_UP)}>
						SIGN UP
					</Button>
				</HStack>
			)}
		</div>
	);
};
