import { useRegisterStore } from "@/stores/useRegisterStore";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ViewNameModal = ({ isOpen, onClose }: Props) => {
  const { ownedNames } = useRegisterStore();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Owned Names</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {ownedNames &&
            ownedNames.length > 0 &&
            ownedNames.map((name, key) => (
              <Text key={key} pt={2}>
                {name}
              </Text>
            ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewNameModal;
