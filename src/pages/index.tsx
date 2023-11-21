import { VStack } from "@chakra-ui/react";

//---------------Local Imports--------------------
import { RegisterForm, HomeImage } from "@/components/register";
import ConnectWalletModal from "@/components/ConnectWalletModal";
import AccountModal from "@/components/AccountModal";

export default function Home() {
  return (
    <VStack
      w="full"
      maxW={{ base: "95%", lg: "40%" }}
      mt={{ base: "10", lg: "20" }}
      spacing={{ base: 16, lg: 20 }}
    >
      <HomeImage />
      <RegisterForm />
      <ConnectWalletModal />
      <AccountModal />
    </VStack>
  );
}
