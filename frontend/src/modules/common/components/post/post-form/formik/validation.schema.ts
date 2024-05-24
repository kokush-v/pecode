import * as Yup from "yup";

export const PostSchema = Yup.object().shape({
	post: Yup.string().min(4, "Too Short!").required("Required"),
});
