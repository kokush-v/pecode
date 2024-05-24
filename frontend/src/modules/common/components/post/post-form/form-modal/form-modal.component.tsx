import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ModalProps,
} from "@chakra-ui/react";

import { FormikForm } from "../formik";

interface FormModalProps extends Omit<ModalProps, "children"> {}

export const FormModal = ({ isOpen, onClose }: FormModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose}>
		<ModalOverlay />
		<ModalContent>
			<ModalHeader>New POST</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<FormikForm />
			</ModalBody>
			<ModalFooter />
		</ModalContent>
	</Modal>
);
