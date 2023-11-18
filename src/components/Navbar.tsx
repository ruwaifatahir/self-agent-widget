import { formatAnyAddress } from "@/utils/helpers";
import { Button, HStack } from "@chakra-ui/react";
import { useAccount, useDisconnect } from "wagmi";
import ModeSwitcher from "./ModeSwitcher";
import RefreshAccountButton from "./RefreshAccountButton";
import { useWalletModalStore } from "@/stores/useWalletStore";

const Navbar = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { connector } = useAccount();
  const setIsWalletModalOpen = useWalletModalStore(
    (state) => state.setIsWalletModalOpen
  );
  return (
    <HStack w="full" maxW={{ base: "95%", lg: "40%" }} mt={5}>
      <Button
        onClick={() => {
          !isConnected && setIsWalletModalOpen(true);
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
      {isConnected && (
        <Button
          onClick={() => {
            disconnect();
          }}
          variant="primary"
          size="sm"
          fontSize={{ base: "2xs", md: "xs", lg: "sm" }}
          px={{ base: 6, md: 8 }}
          py={{ base: 4, md: 5 }}
        >
          Disconnect
        </Button>
      )}
      <ModeSwitcher />
      {connector && connector?.id === "injected" && <RefreshAccountButton />}
    </HStack>
  );
};

export default Navbar;
