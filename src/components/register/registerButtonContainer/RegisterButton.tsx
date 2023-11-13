import { Button } from "@chakra-ui/react";
import { useRegisterStore } from "@/stores/useRegisterStore";
import { useFormContext } from "react-hook-form";

//---------------Local Imports--------------------

const RegisterButton = () => {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();
  const {
    registrationStatus: { isRegistering, isRegisterDisabled },
  } = useRegisterStore();

  return (
    <Button
      w="full"
      py={{ base: 6, md: 8 }}
      fontSize={{ base: "sm", md: "lg" }}
      variant="primary"
      isLoading={isRegistering || isSubmitting}
      isDisabled={isRegisterDisabled || !isValid}
      type="submit"
    >
      Register
    </Button>
  );
};

export default RegisterButton;
