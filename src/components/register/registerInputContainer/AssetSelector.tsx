import { useRegisterStore } from "@/stores/useRegisterStore";
import { InputRightElement, Select, Spinner } from "@chakra-ui/react";
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

  return (
    <InputRightElement h="full" mr={2} w="10%">
      {isValidating ? (
        <Spinner color="blue.700" size="sm" />
      ) : (
        <Select
          {...register("token")}
          isDisabled={isSubmitting || isRegistering || !isValidChain}
        >
          <option value="self">SELF</option>
          <option value="usdt">USDT</option>
        </Select>
      )}
    </InputRightElement>
  );
};

export default AssetSelector;
