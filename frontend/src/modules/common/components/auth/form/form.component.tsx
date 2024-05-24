import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Heading,
	Input,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation, useRegisterUserMutation } from "../../../../redux/api/auth";
import { ROUTER_KEYS } from "../../../consts/app-keys.const";
import { LoginAuthData, RegisterAuthData } from "../../../types/auth/auth.types";
import { showErrorToastWithText, showSuccesToast } from "../../form.toasts";
import { userSelector } from "../../user/user.selector";
import { authSchema } from "./validation.schema";

/* eslint-disable */

export interface FormikAuthFormProps {
	type: "register" | "login";
}

export const FormikAuthForm = ({ type }: FormikAuthFormProps) => {
	const toast = useToast();
	const navigate = useNavigate();

	const [registerUser] = useRegisterUserMutation();
	const [loginUser] = useLoginUserMutation();

	const user = useSelector(userSelector);

	const sumbitFunc = {
		login: async (values: LoginAuthData) => {
			try {
				await loginUser(values).unwrap();
				showSuccesToast(toast, "Logined");
			} catch (error: any) {
				if ("data" in error) showErrorToastWithText(toast, error.data.message);
			}
		},

		register: async (values: RegisterAuthData) => {
			try {
				await registerUser(values).unwrap();
				showSuccesToast(toast, "Account created");
			} catch (error: any) {
				if ("data" in error) showErrorToastWithText(toast, error.data.message);
			}
		},
	};

	const formik = useFormik<RegisterAuthData>({
		initialValues: { email: "", password: "", name: "" },
		validationSchema: authSchema,
		onSubmit: sumbitFunc[type as keyof typeof sumbitFunc],
	});

	useEffect(() => {
		if (user) navigate(ROUTER_KEYS.HOME);
	}, [user]);

	return (
		<Flex bg="gray.100" align="center" justify="center" h="100vh">
			<Box bg="white" p={6} rounded="md" w={"25%"}>
				<form onSubmit={formik.handleSubmit}>
					<VStack spacing={4} align="flex-start">
						<Heading size={"md"} color="purple" textTransform={"uppercase"}>
							{type === "login" ? "sign in" : "sign up"}
						</Heading>
						<FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
							<FormLabel htmlFor="email">Email Address</FormLabel>
							<Input
								id="email"
								name="email"
								type="text"
								variant="filled"
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
							<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
						</FormControl>
						{type === "register" && (
							<FormControl isInvalid={!!formik.errors.name && formik.touched.name}>
								<FormLabel htmlFor="password">Name</FormLabel>
								<Input
									id="name"
									name="name"
									type="text"
									variant="filled"
									onChange={formik.handleChange}
									value={formik.values.name}
								/>
								<FormErrorMessage>{formik.errors.name}</FormErrorMessage>
							</FormControl>
						)}
						<FormControl isInvalid={!!formik.errors.password && formik.touched.password}>
							<FormLabel htmlFor="password">Password</FormLabel>
							<Input
								id="password"
								name="password"
								type="password"
								variant="filled"
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
							<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
						</FormControl>
						<HStack justifyContent={"space-between"} width={"100%"}>
							<Link
								className="text-sm text-gray-400 "
								to={type === "login" ? ROUTER_KEYS.AUTH.SIGN_UP : ROUTER_KEYS.AUTH.LOGIN}>
								{type === "login" ? "Create account" : "Login"}
							</Link>
						</HStack>
						<Button
							type="submit"
							colorScheme="purple"
							width="fit-content"
							alignSelf={"center"}>
							{type === "login" ? "Login" : "Create account"}
						</Button>
					</VStack>
				</form>
			</Box>
		</Flex>
	);
};
