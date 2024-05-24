import { Card, CardBody, CardProps, Divider, Heading, VStack } from "@chakra-ui/react";

import { IPost } from "../../../types/post/post.types";

interface PostProps extends CardProps {
	post: IPost;
	baseMg: number;
}

export const Post = ({ post, ...props }: PostProps) => {
	return (
		<VStack width={"100%"}>
			<Card {...props} backgroundColor={"#fafafa"} width={"100%"} height={"auto"}>
				<CardBody onClick={() => {}} width={"100%"}>
					<VStack width={"100%"} alignItems={"start"}>
						<Heading size={"sm"}>№ {post.id}</Heading>
						<Divider orientation="horizontal" height={"1em"} />
						<Heading>{post.post}</Heading>
						<Divider orientation="horizontal" height={"1em"} />
						<Heading size={"sm"}>Created by: {post.createdBy.name}</Heading>
					</VStack>
				</CardBody>
			</Card>
		</VStack>
	);
};
