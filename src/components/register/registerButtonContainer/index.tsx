import { useEffect, useState } from "react";
import { erc20ABI, useAccount, useContractRead } from "wagmi";
import { Address, formatEther } from "viem";
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
import RefreshAccountButton from "./RefreshAccountButton";

const RegisterButtonContainer = () => {
  const [parentAddress, setParentAddress] = useState<Address | string>("");
  const { setAllowance, isValidChain } = useRegisterStore();
  const { watch } = useFormContext();

  const {
    address,
    isConnecting,
    isConnected,
    isDisconnected,
    connector: activeConnector,
  } = useAccount();
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

  // useEffect(() => {
  //   // listen to updateAccount event from top frame
  //   const handleUpdateAccount = ({ data }: MessageEvent) => {
  //     if (data.type === "updateAccount") setParentAddress(data.account);
  //   };
  //   window.addEventListener("message", handleUpdateAccount);

  //   return () => window.removeEventListener("message", handleUpdateAccount);
  // }, []);

  const isNotConnected = isDisconnected || isConnecting;
  const isNotApproved = isConnected && data < 10000;

  const isAddressDifferent = address !== parentAddress;
  const isUsingCorrectConnector =
    activeConnector?.id === "injected" || activeConnector?.id === "eip6963";
  if (isNotConnected) return <ConnectButton />;
  // if (parentAddress && isAddressDifferent && isUsingCorrectConnector)
  //   return <RefreshAccountButton />;
  if (!isValidChain) return <SwitchChainButton />;
  if (isNotApproved) return <ApproveButton />;

  return <RegisterButton />;
};

export default RegisterButtonContainer;
