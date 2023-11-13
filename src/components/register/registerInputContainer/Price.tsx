import { selfAddonAbi } from "@/abi/selfAddonAbi";
import { selfNftAbi } from "@/abi/selfNftAbi";
import { SelectedTokenType, useRegisterStore } from "@/stores/useRegisterStore";
import {
  PAY_TKN_ADDRESSES,
  SELF_NFT_ADDON_ADDR,
  SELF_NFT_ADDR,
} from "@/utils/constants/addresses";
import { formatBigIntToNumber } from "@/utils/helpers";
import { Text } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "usehooks-ts";
import { useAccount, useContractRead } from "wagmi";

const Price = () => {
  const { isConnected } = useAccount();
  const { watch } = useFormContext();
  const { isValidChain } = useRegisterStore();
  const debouncedName = useDebounce(watch("name"), 500);
  const selectedTkn: SelectedTokenType = watch("token");

  const { data: price = 0 } = useContractRead({
    address: SELF_NFT_ADDR,
    abi: selfNftAbi,
    functionName: "getPrice",
    args: [debouncedName],
    enabled: debouncedName && isConnected,
    watch: debouncedName && isConnected,
    select: (data) => {
      return formatBigIntToNumber(data, 6);
    },
  });

  const { data: priceInPayTkn = 0 } = useContractRead({
    address: SELF_NFT_ADDON_ADDR,
    abi: selfAddonAbi,
    functionName: "getPrice",
    args: [
      debouncedName,
      PAY_TKN_ADDRESSES[selectedTkn !== "self" ? selectedTkn : "usdt"],
    ],
    enabled: Boolean(debouncedName) && isConnected && selectedTkn !== "self",
    watch: Boolean(debouncedName) && isConnected && Boolean(selectedTkn),

    select: (data) => {
      return formatBigIntToNumber(data, 18);
    },
  });

  if (!debouncedName || debouncedName?.length == 0) return null;
  if (!isValidChain) return null;
  if (selectedTkn === "self")
    return (
      <Text fontSize={{ base: "xs", md: "sm" }}>{`Price: ${price} $SELF`}</Text>
    );
  return (
    <Text
      fontSize={{ base: "xs", md: "sm" }}
    >{`Price: ${priceInPayTkn} ${selectedTkn.toUpperCase()}`}</Text>
  );
};

export default Price;
