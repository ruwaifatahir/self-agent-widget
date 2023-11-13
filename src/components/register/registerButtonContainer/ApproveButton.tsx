import { Button } from "@chakra-ui/react";
import { parseUnits } from "viem";
import { erc20ABI, useContractWrite, useWaitForTransaction } from "wagmi";
//---------------Local Imports--------------------
import {
  PAY_TKN_ADDRESSES,
  SELF_NFT_ADDON_ADDR,
  SELF_TKN_ADDR,
} from "@/utils/constants/addresses";
import { SelectedTokenType, useRegisterStore } from "@/stores/useRegisterStore";
import { useFormContext } from "react-hook-form";

const ApproveButton = () => {
  const { watch } = useFormContext();
  const selectedTkn: SelectedTokenType = watch("token");
  const tokenToApprove =
    selectedTkn === "self" ? SELF_TKN_ADDR : PAY_TKN_ADDRESSES[selectedTkn];

  const { write, isLoading, data } = useContractWrite({
    address: tokenToApprove,
    abi: erc20ABI,
    functionName: "approve",
    args: [SELF_NFT_ADDON_ADDR, parseUnits("10000", 32)],
  });

  const { isLoading: isLoadingHash } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Button
      w="full"
      py={{ base: 6, md: 8 }}
      fontSize={{ base: "sm", md: "lg" }}
      variant="primary"
      isLoading={isLoading || isLoadingHash}
      isDisabled={!write || isLoading || isLoadingHash}
      onClick={() => {
        if (write) write();
      }}
    >
      Approve
    </Button>
  );
};

export default ApproveButton;
