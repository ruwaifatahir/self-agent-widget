import { VStack } from "@chakra-ui/react";
import Feedback from "./Feedback";
import Input from "./Input";

import ViewNames from "./ViewNames";

const RegisterInputContainer = () => {
  return (
    <VStack w="full" align="start ">
      <ViewNames />
      <Input />
      <Feedback />
    </VStack>
  );
};

export default RegisterInputContainer;
