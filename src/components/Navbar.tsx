import { formatAnyAddress } from "@/utils/helpers";
import { Button, HStack, Text } from "@chakra-ui/react";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { open: isOpen } = useWeb3ModalState();

  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  return (
    <HStack w="full" maxW={{ base: "95%", lg: "40%" }} mt={5}>
      {/* <Text>Logo</Text> */}
      <Button
        onClick={() => {
          open();
        }}
        isDisabled={isConnecting || isReconnecting || isOpen}
        isLoading={isConnecting || isReconnecting || isOpen}
        variant="primary"
        size="sm"
        fontSize={{ base: "2xs", md: "xs", lg: "sm" }}
        px={{ base: 6, md: 8 }}
        py={{ base: 4, md: 5 }}
      >
        {isConnected ? formatAnyAddress(address as string) : "Connect"}
      </Button>
    </HStack>
  );
};

export default Navbar;
