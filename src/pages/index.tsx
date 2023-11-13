import { VStack } from "@chakra-ui/react";

//---------------Local Imports--------------------
import { RegisterForm, HomeImage } from "@/components/register";

export default function Home() {
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
