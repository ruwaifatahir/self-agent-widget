import { SelectedTokenType, useRegisterStore } from "@/stores/useRegisterStore";
import { PAY_TKN_ADDRESSES, SELF_TKN_ADDR } from "@/utils/constants/addresses";
import { formatBigIntToNumber } from "@/utils/helpers";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useAccount, useBalance } from "wagmi";

const Balance = () => {
  const { watch } = useFormContext(); // retrieve all hook methods
  const { isValidChain } = useRegisterStore();
  const { address, isConnected, isDisconnected, isConnecting } = useAccount();
  const selectedToken: SelectedTokenType = watch("token");

  const tokenToCheckBalanceFor =
    selectedToken === "self" ? SELF_TKN_ADDR : PAY_TKN_ADDRESSES[selectedToken];

  const { data = { value: BigInt(0) } } = useBalance({
    address,
    token: tokenToCheckBalanceFor,
    enabled: isConnected,
    watch: isConnected,
  });

  const balance = formatBigIntToNumber(data.value);

  if (isDisconnected || isConnecting) return null;
  if (!isValidChain) return null;

  return (
    <Text
      fontSize={{ base: "xs", md: "sm" }}
    >{`Balance: ${balance} ${selectedToken?.toUpperCase()}`}</Text>
  );
};

export default Balance;
