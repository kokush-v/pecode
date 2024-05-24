import React from "react";
import { PostContainer } from "../../common/components/post/post-container";
import { UserHeader } from "../../common/components/user/user-header";

const HomePageContainer = () => (
	<div className="min-h-[100vh] w-[70%] m-auto bg-white">
		<UserHeader />
		<PostContainer />
	</div>
);

export default HomePageContainer;
