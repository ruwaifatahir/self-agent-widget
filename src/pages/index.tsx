import { VStack } from "@chakra-ui/react";

//---------------Local Imports--------------------
import { RegisterForm, HomeImage } from "@/components/register";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useAddressStore } from "@/stores/useAddressStore";

export default function Home() {
  const { address } = useAccount();

  const setParentAddress = useAddressStore((state) => state.setParentAddress);

  useEffect(() => {
    // listen to updateAccount event from top frame
    const handleUpdateAccount = ({ data }: MessageEvent) => {
      if (data.type === "updateAccount") setParentAddress(data.account);
    };
    window.addEventListener("message", handleUpdateAccount);

    return () => window.removeEventListener("message", handleUpdateAccount);
  }, [address]);

  return (
    <VStack
      w="full"
      maxW={{ base: "95%", lg: "40%" }}
      mt={{ base: "10", lg: "20" }}
      spacing={{ base: 10, lg: 20 }}
    >
      <HomeImage />
      <RegisterForm />
    </VStack>
  );
}
