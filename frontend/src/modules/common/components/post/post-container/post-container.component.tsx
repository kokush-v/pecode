import { AddIcon } from "@chakra-ui/icons";
import { Button, Divider, Heading, Spinner, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../../../../redux/api/posts";
import { ROUTER_KEYS } from "../../../consts/app-keys.const";
import { userSelector } from "../../user/user.selector";
import { FormModal } from "../post-form/form-modal";
import { PostList } from "../post-list";

/* eslint-disable */

export const PostContainer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const user = useSelector(userSelector);
	const { data: posts, isLoading, isError } = useGetPostsQuery(null);

	const fetchMore = async () => {};

	return (
		<div className="flex flex-col w-full items-center">
			<Divider orientation="horizontal"></Divider>
			<div className=" w-full flex justify-between items-center p-3">
				<Heading size={"lg"}>POSTS List</Heading>
				<Button
					onClick={() => {
						user ? onOpen() : navigate(ROUTER_KEYS.AUTH.LOGIN);
					}}
					colorScheme="purple"
					variant="outline"
					leftIcon={<AddIcon boxSize={3} />}>
					NEW POST
				</Button>
			</div>
			<Divider orientation="horizontal"></Divider>
			<FormModal isOpen={isOpen} onClose={onClose} />
			{isLoading && (
				<div
					style={{
						position: "absolute",
						width: "100vw",
						height: "100vh",
						backgroundColor: "rgba(255, 255, 255, 0.54)",
						zIndex: "100",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Spinner size={"xl"} />
				</div>
			)}

			{isError && <Heading className="mt-[3em]">Nothing here, please login</Heading>}

			{posts && <PostList posts={posts} />}
		</div>
	);
};
