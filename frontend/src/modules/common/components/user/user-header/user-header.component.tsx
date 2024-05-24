import { Button, HStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import { useGetUserQuery } from "../../../../redux/api/user";
import { logout } from "../../../../redux/store/userSlice";
import { ROUTER_KEYS, STORAGE_KEYS } from "../../../consts/app-keys.const";

export const UserHeader = () => {
	const navigate = useNavigate();
	const { data: user } = useGetUserQuery(null);
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
