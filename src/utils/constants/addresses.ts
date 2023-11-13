import { Address } from "viem";

export const SELF_TKN_ADDR = process.env.NEXT_PUBLIC_SELF_TOKEN as Address;
export const SELF_NFT_ADDR = process.env.NEXT_PUBLIC_SELF_NFT_ADDR as Address;
export const SELF_NFT_ADDON_ADDR = process.env
  .NEXT_PUBLIC_SELF_NFT_ADDON_ADDR as Address;

export const PAY_TKN_ADDRESSES = {
  usdt: process.env.NEXT_PUBLIC_USDT as Address,
};
