import { erc20ABI, useAccount, useContractRead } from "wagmi";
import { formatEther } from "viem";
import { useFormContext } from "react-hook-form";

//---------------Local Imports--------------------
import {
  PAY_TKN_ADDRESSES,
  SELF_NFT_ADDON_ADDR,
  SELF_TKN_ADDR,
} from "@/utils/constants/addresses";
import ConnectButton from "./ConnectButton";
import SwitchChainButton from "./SwitchChainButton";
import ApproveButton from "./ApproveButton";
import RegisterButton from "./RegisterButton";
import { SelectedTokenType, useRegisterStore } from "@/stores/useRegisterStore";
import { useEffect } from "react";

const RegisterButtonContainer = () => {
  const { isValidChain, setAllowance } = useRegisterStore();
  const { watch } = useFormContext();

  const { address, isConnecting, isConnected, isDisconnected } = useAccount();

  const selectedTkn: SelectedTokenType = watch("token");

  const tokenToCheckAllowanceFor =
    selectedTkn === "self" ? SELF_TKN_ADDR : PAY_TKN_ADDRESSES[selectedTkn];

  const { data = 0 } = useContractRead({
    address: tokenToCheckAllowanceFor,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address!, SELF_NFT_ADDON_ADDR],
    enabled: isConnected,
    watch: isConnected,
    select: (data) => {
      return Number(formatEther(data));
    },
  });

  useEffect(() => {
    setAllowance(data);
  }, [data, setAllowance]);

  const isNotConnected = isDisconnected || isConnecting;
  const isNotApproved = isConnected && data < 10000;

  if (isNotConnected) return <ConnectButton />;
  if (!isValidChain) return <SwitchChainButton />;
  if (isNotApproved) return <ApproveButton />;

  return <RegisterButton />;
};

export default RegisterButtonContainer;
