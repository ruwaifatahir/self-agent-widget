import { useRegisterStore } from "@/stores/useRegisterStore";
import {
  InputRightElement,
  Select,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const AssetSelector = () => {
  const {
    register,
    formState: { isValidating, isSubmitting },
  } = useFormContext(); // retrieve all hook methods

  const {
    registrationStatus: { isRegistering },
    isValidChain,
  } = useRegisterStore();

  const selectBorderColor = useColorModeValue(
    "blackAlpha.600",
    "whiteAlpha.600"
  );

  return (
    <InputRightElement h="full" mr={2} w={{ base: "25", lg: "15%" }}>
      {isValidating ? (
        <Spinner color="blue.700" size="sm" mr={2} />
      ) : (
        <Select
          {...register("token")}
          isDisabled={isSubmitting || isRegistering || !isValidChain}
          fontSize={{ base: "xs", md: "sm" }}
          borderColor={selectBorderColor}
          cursor={"pointer"}
        >
          <option value="self">SELF</option>
          <option value="usdt">USDT</option>
        </Select>
      )}
    </InputRightElement>
  );
};

export default AssetSelector;
