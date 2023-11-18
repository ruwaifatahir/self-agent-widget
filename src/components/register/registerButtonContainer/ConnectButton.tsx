import { useWalletModalStore } from "@/stores/useWalletStore";
import { Button } from "@chakra-ui/react";
import { useAccount } from "wagmi";
//---------------Local Imports--------------------

const ConnectButton = () => {
  const { isConnecting } = useAccount();
  const setIsWalletModalOpen = useWalletModalStore(
    (state) => state.setIsWalletModalOpen
  );
  return (
    <Button
      w="full"
      py={{ base: 6, md: 8 }}
      fontSize={{ base: "sm", md: "lg" }}
      variant="primary"
      isLoading={isConnecting}
      onClick={() => {
        setIsWalletModalOpen(true);
      }}
    >
      Connect
    </Button>
  );
};

export default ConnectButton;
