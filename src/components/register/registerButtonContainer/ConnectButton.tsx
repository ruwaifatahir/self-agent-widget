import { Button } from "@chakra-ui/react";
import { useAccount } from "wagmi";
//---------------Local Imports--------------------

const ConnectButton = () => {
  // const { open } = useWeb3Modal();
  // const { open: isOpen } = useWeb3ModalState();

  const { isConnecting } = useAccount();

  return (
    <Button
      w="full"
      py={{ base: 6, md: 8 }}
      fontSize={{ base: "sm", md: "lg" }}
      variant="primary"
      isDisabled={isConnecting}
      isLoading={isConnecting}
      onClick={() => {
        // open();
      }}
    >
      Connect
    </Button>
  );
};

export default ConnectButton;
