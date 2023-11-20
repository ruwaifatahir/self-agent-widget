import { Text, useDisclosure } from "@chakra-ui/react";
import ViewNameModal from "./ViewNameModal";

const ViewNames = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Text
        onClick={onOpen}
        color="#979797"
        textDecoration={"underline"}
        fontSize={"14px"}
        mt={5}
        cursor="pointer"
      >
        Check your owned names here
      </Text>
      <ViewNameModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ViewNames;
