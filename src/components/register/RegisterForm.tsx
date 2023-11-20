import { useEffect } from "react";
import { VStack, useColorMode } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";

//---------------Local Imports--------------------
import {
  RegisterButtonContainer,
  RegisterInputContainer,
} from "@/components/register";
import { SelectedTokenType, useRegisterStore } from "@/stores/useRegisterStore";
import {
  PAY_TKN_ADDRESSES,
  SELF_NFT_ADDON_ADDR,
  SELF_NFT_ADDR,
} from "@/utils/constants/addresses";
import { selfAddonAbi } from "@/abi/selfAddonAbi";
import { useRouter } from "next/router";
import { selfNftAbi } from "@/abi/selfNftAbi";
import ViewNames from "./registerInputContainer/ViewNames";

const CHAIN_ID = process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID!;

const RegisterForm = () => {
  const methods = useForm<{ name: string; token: SelectedTokenType }>({
    mode: "onChange",
  });

  const { address, isConnected, connector } = useAccount();
  const { chain } = useNetwork();
  const { setRegistrationStatus, setIsValidChain, setOwnedNames } =
    useRegisterStore();

  const { setColorMode } = useColorMode();

  const router = useRouter();

  const selectedTkn: SelectedTokenType = methods.watch("token");
  const nameToRegister = methods.watch("name");
  const agentAddress = router.query.agent;
  const colorMode = router.query.colorMode;

  // Construct the registrationData based on registrationType
  const registrationData =
    selectedTkn === "self"
      ? {
          functionName: "registerNameSelf",
          args: [nameToRegister, agentAddress],
        }
      : {
          functionName: "registerName",
          args: [nameToRegister, PAY_TKN_ADDRESSES[selectedTkn], agentAddress],
        };

  const { write, data, isLoading } = useContractWrite({
    address: SELF_NFT_ADDON_ADDR, // Contract address
    abi: selfAddonAbi, // ABI (Application Binary Interface)
    ...(registrationData as any), // Function name and arguments
  });

  const { isLoading: isLoadingHash } = useWaitForTransaction({
    hash: data?.hash, // Transaction hash to monitor
  });

  const { data: ownedNames } = useContractRead({
    address: SELF_NFT_ADDR,
    abi: selfNftAbi,
    functionName: "getNames",
    args: [address as Address],
    enabled: isConnected,
    watch: isConnected,
  });

  // Determine if the registration is in progress
  const isRegistering = isLoading || isLoadingHash;

  // Determine if the registration button should be disabled
  const isRegisterDisabled = !write || isRegistering;

  useEffect(() => {
    setRegistrationStatus({ isRegistering, isRegisterDisabled });
  }, [setRegistrationStatus, isRegistering, isRegisterDisabled]);

  useEffect(() => {
    if (chain?.id == +CHAIN_ID) setIsValidChain(true);
    else setIsValidChain(false);
  }, [setIsValidChain, chain?.id]);

  useEffect(() => {
    setOwnedNames(ownedNames as string[]);
  }, [ownedNames, setOwnedNames]);

  useEffect(() => {
    if (colorMode == "light" || colorMode == "dark") {
      setColorMode(colorMode);
    }
  }, [colorMode, setColorMode]);

  const onSubmit = () => {
    try {
      write?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormProvider {...methods}>
      <VStack
        w="full"
        spacing={8}
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <RegisterInputContainer />
        <RegisterButtonContainer />
        <ViewNames />
      </VStack>
    </FormProvider>
  );
};

export default RegisterForm;
