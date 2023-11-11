import { VStack } from "@chakra-ui/react";

//---------------Local Imports--------------------
import { RegisterForm, HomeImage } from "@/components/register";

export default function Home() {
  return (
    <VStack w="full" maxW="70%" mt="20" spacing={20}>
      <HomeImage />
      <RegisterForm />
    </VStack>
  );
}
