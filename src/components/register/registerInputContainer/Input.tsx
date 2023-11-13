import { Input as ChakraInput, InputGroup } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "usehooks-ts";
import { useRegisterStore } from "@/stores/useRegisterStore";
import AssetSelector from "./AssetSelector";
import { useValidations } from "./validation/useValidations";

const Input = () => {
  const {
    register,
    watch,
    trigger,
    formState: { isSubmitting, errors },
  } = useFormContext(); // retrieve all hook methods

  const {
    registrationStatus: { isRegistering },
    allowance,
    isValidChain,
  } = useRegisterStore();

  const name = watch("name");
  const debouncedName = useDebounce(name, 500);

  const validations = useValidations(debouncedName);

  useEffect(() => {
    const triggerFieldValidation = async () => {
      if (debouncedName) await trigger("name");
    };
    triggerFieldValidation();
  }, [debouncedName, trigger]);

  return (
    <InputGroup>
      <ChakraInput
        py={7}
        borderColor="blackAlpha.600"
        rounded="md"
        {...register("name", validations)}
        isInvalid={!!errors.name}
        isDisabled={
          isSubmitting || isRegistering || allowance < 16000 || !isValidChain
        }
        errorBorderColor="red.300"
      />
      <AssetSelector />
    </InputGroup>
  );
};

export default Input;
