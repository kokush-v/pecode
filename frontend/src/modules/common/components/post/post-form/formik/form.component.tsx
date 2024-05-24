import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Fade,
	FormControl,
	FormErrorMessage,
	Textarea,
	VStack,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";

import { useCreatePostMutation } from "../../../../../redux/api/posts";
import { IPostForm } from "../../../../types/post/post.types";
import { showErrorToastWithText, showSuccesToast } from "../../../form.toasts";
import { PostSchema } from "./validation.schema";

export const FormikForm = () => {
	const toast = useToast();
	const [createPost] = useCreatePostMutation();
	const { isOpen: isVisibleSuccess, onOpen: successOnOpen } = useDisclosure();

	const formik = useFormik<IPostForm>({
		initialValues: {
			post: "",
		},
		validationSchema: PostSchema,
		onSubmit: async (values) => {
			try {
				await createPost(values).unwrap();
				showSuccesToast(toast, "Post added");
				successOnOpen();
			} catch (error: any) {
				if ("data" in error) showErrorToastWithText(toast, error.data.message);
			}
		},
	});

	return (
		<div>
			<Box bg="white" rounded="md">
				{!isVisibleSuccess ? (
					<Fade in={!isVisibleSuccess}>
						<form onSubmit={formik.handleSubmit}>
							<VStack spacing={4} align="center">
								<FormControl
									height={"auto"}
									isInvalid={formik.touched.post && !!formik.errors.post}>
									<Textarea
										id="post"
										name="post"
										value={formik.values.post}
										style={{ height: "240px" }}
										onChange={(e) => {
											formik.handleChange(e);
										}}
									/>
									{formik.touched.post && (
										<FormErrorMessage>Text is required.</FormErrorMessage>
									)}
								</FormControl>
								<Button type="submit" colorScheme="purple" width="full">
									Create post
								</Button>
							</VStack>
						</form>
					</Fade>
				) : (
					<Fade in={isVisibleSuccess}>
						<Alert
							borderRadius=".5em"
							status="success"
							variant="subtle"
							flexDirection="column"
							alignItems="center"
							justifyContent="center"
							textAlign="center"
							minHeight="250px">
							<AlertIcon boxSize="40px" mr={0} />
							<AlertTitle mt={4} mb={1} fontSize="lg">
								POST submitted!
							</AlertTitle>
							<AlertDescription maxWidth="sm">
								Thanks for submitting your post.
							</AlertDescription>
						</Alert>
					</Fade>
				)}
			</Box>
		</div>
	);
};
