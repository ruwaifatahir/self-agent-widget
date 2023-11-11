import { WarningIcon } from "@chakra-ui/icons";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import Balance from "./Balance";
import Price from "./Price";

const Feedback = () => {
  const {
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  return (
    <>
      {errors.name ? (
        <ErrorMessage errors={errors} />
      ) : (
        <HStack w="full" justify="space-between">
          <Price />
          <Balance />
        </HStack>
      )}
    </>
  );
};

const ErrorMessage = ({ errors }: any) => {
  return (
    <HStack justify="space-between" w="full">
      <Text fontSize="sm" color="red.600" fontWeight="medium">
        <Icon as={WarningIcon} boxSize={4} mr={2} mb={0.5} />

        {errors.name.message as any}
      </Text>
    </HStack>
  );
};

export default Feedback;
