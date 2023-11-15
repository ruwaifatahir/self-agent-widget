import { erc20ABI, useAccount, useContractRead } from "wagmi";
import { formatEther } from "viem";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
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
import { useAddressStore } from "@/stores/useAddressStore";
import RefreshAccountButton from "./RefreshAccountButton";

const RegisterButtonContainer = () => {
  const {
    address,
    isConnecting,
    isConnected,
    isDisconnected,
    connector: activeConnector,
  } = useAccount();
  const { watch } = useFormContext();
  const { setAllowance, isValidChain } = useRegisterStore();
  const parentAddress = useAddressStore((state) => state.parentAddress);
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

  const isAddressDifferent = address !== parentAddress;
  if (isNotConnected) return <ConnectButton />;
  if (
    parentAddress &&
    isAddressDifferent &&
    (activeConnector?.id === "injected" || activeConnector?.id === "eip6963")
  )
    return <RefreshAccountButton />;
  if (!isValidChain) return <SwitchChainButton />;
  if (isNotApproved) return <ApproveButton />;

  return <RegisterButton />;
};

export default RegisterButtonContainer;
