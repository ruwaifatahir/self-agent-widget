import { VStack } from "@chakra-ui/react";
import Feedback from "./Feedback";
import Input from "./Input";

const RegisterInputContainer = () => {
  return (
    <VStack w="full" align="start ">
      <Input />
      <Feedback />
    </VStack>
  );
};

export default RegisterInputContainer;
