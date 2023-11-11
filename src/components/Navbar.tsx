import { formatAnyAddress } from "@/utils/helpers";
import { Button, HStack, Text } from "@chakra-ui/react";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { open: isOpen } = useWeb3ModalState();

  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  return (
    <HStack w="80%" justify="flex-end" mt={5}>
      {/* <Text>Logo</Text> */}
      <Button
        onClick={() => {
          open();
        }}
        isDisabled={isConnecting || isReconnecting || isOpen}
        isLoading={isConnecting || isReconnecting || isOpen}
        variant="primary"
        px={10}
        py={6}
      >
        {isConnected ? formatAnyAddress(address as string) : "Connect"}
      </Button>
    </HStack>
  );
};

export default Navbar;
