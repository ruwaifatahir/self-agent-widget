import { formatAnyAddress } from "@/utils/helpers";
import { Button, HStack } from "@chakra-ui/react";
import { useAccount, useConnect } from "wagmi";
import ModeSwitcher from "./ModeSwitcher";
import RefreshAccountButton from "./RefreshAccountButton";

const Navbar = () => {
  const { connect, connectors } = useConnect();
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();

  console.log(isConnecting);
  console.log(isConnected);
  console.log(address);

  return (
    <HStack w="full" maxW={{ base: "95%", lg: "40%" }} mt={5}>
      <Button
        onClick={() => {
          connectors && connect({ connector: connectors[0] });
        }}
        isDisabled={isConnecting || isReconnecting}
        isLoading={isConnecting || isReconnecting}
        variant="primary"
        size="sm"
        fontSize={{ base: "2xs", md: "xs", lg: "sm" }}
        px={{ base: 6, md: 8 }}
        py={{ base: 4, md: 5 }}
      >
        {isConnected ? formatAnyAddress(address as string) : "Connect W"}
      </Button>

      <Button
        onClick={() => {
          connectors && connect({ connector: connectors[1] });
        }}
        isDisabled={isConnecting || isReconnecting}
        isLoading={isConnecting || isReconnecting}
        variant="primary"
        size="sm"
        fontSize={{ base: "2xs", md: "xs", lg: "sm" }}
        px={{ base: 6, md: 8 }}
        py={{ base: 4, md: 5 }}
      >
        {isConnected ? formatAnyAddress(address as string) : "Connect 1"}
      </Button>
      <ModeSwitcher />
      <RefreshAccountButton />
    </HStack>
  );
};

export default Navbar;
