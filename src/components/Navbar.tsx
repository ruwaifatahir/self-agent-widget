import { formatAnyAddress } from "@/utils/helpers";
import { Button, HStack } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import ModeSwitcher from "./ModeSwitcher";
import { useWalletModalStore } from "@/stores/useWalletStore";

const Navbar = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const setIsWalletModalOpen = useWalletModalStore(
    (state) => state.setIsWalletModalOpen
  );
  const setIsAccountModalOpen = useWalletModalStore(
    (state) => state.setIsAccountModalOpen
  );
  return (
    <HStack w="full" maxW={{ base: "95%", lg: "40%" }} mt={5}>
      <Button
        onClick={() => {
          !isConnected
            ? setIsWalletModalOpen(true)
            : setIsAccountModalOpen(true);
        }}
        variant="primary"
        size="sm"
        fontSize={{ base: "2xs", md: "xs", lg: "sm" }}
        px={{ base: 6, md: 8 }}
        py={{ base: 4, md: 5 }}
        isLoading={isConnecting}
      >
        {isConnected ? formatAnyAddress(address as string) : "Connect"}
      </Button>
      <ModeSwitcher />
    </HStack>
  );
};

export default Navbar;
