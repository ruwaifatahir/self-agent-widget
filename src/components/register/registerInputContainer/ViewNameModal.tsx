import { useRegisterStore } from "@/stores/useRegisterStore";
import { SELF_NFT_ADDR } from "@/utils/constants/addresses";
import { hashString } from "@/utils/helpers";
import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

const blockExplorerUrl = process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ViewNameModal = ({ isOpen, onClose }: Props) => {
  const { ownedNames } = useRegisterStore();
  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "xs", md: "sm" }}>
      <ModalOverlay />
      <ModalContent
        width={"95%"}
        maxWidth={"350px"}
        maxHeight={"80vh"}
        overflow="scroll"
        pt={"35px"}
        pb={"32px"}
        px={"12px"}
      >
        <ModalHeader
          padding={0}
          display={"flex"}
          justifyContent={"center"}
          mb={9}
        >
          <Text
            textAlign={"center"}
            fontSize={"20px"}
            fontWeight={600}
            color={colorMode === "light" ? "#767676" : "#fff"}
            borderBottom={"2px"}
            borderStyle={"solid"}
            borderColor={colorMode === "light" ? "#767676" : "#fff"}
            width={"fit-content"}
            lineHeight={"20px"}
          >
            Owned Names
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <VStack gap={"10px"}>
            {ownedNames &&
              ownedNames.length > 0 &&
              ownedNames.map((name, key) => <NameBox key={key} name={name} />)}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewNameModal;

const NameBox = ({ name }: { name: string }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      width={"100%"}
      borderRadius={"5px"}
      border={colorMode === "light" ? "1px solid #CDCDCD" : "1px solid #5A636C"}
      background={
        colorMode === "light"
          ? "rgba(225, 225, 225, 0.10)"
          : "rgba(74, 84, 97, 0.10)"
      }
      boxShadow={
        colorMode === "light"
          ? "0px 0px 5px 0px rgba(141, 137, 137, 0.50)"
          : "0px 0px 5px 0px #34373D"
      }
      py={"14px"}
      px={5}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Text
        fontSize={"16px"}
        fontWeight={500}
        color={colorMode === "light" ? "#909090" : "#B8B8B8"}
      >
        {name}
      </Text>
      <a
        href={`${blockExplorerUrl}token/${SELF_NFT_ADDR}?a=${hashString(
          name as string
        )}`}
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/link-icon.svg"
          alt="view self name on block explorer"
          width={"22px"}
          height={"22px"}
        />
      </a>
    </Box>
  );
};
