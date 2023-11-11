import { selfNftAbi } from "@/abi/selfNftAbi";
import { SELF_NFT_ADDR } from "@/utils/constants/addresses";
import { validateName } from "@/utils/helpers";
import { readContract } from "wagmi/actions";

export const checkIsNameReserved = async (name: string) => {
  try {
    if (!validateName(name)) return;

    const data = await readContract({
      address: SELF_NFT_ADDR,
      abi: selfNftAbi,
      functionName: "reservedNames",
      args: [name],
    });
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const checkIsNameAvailable = async (name: string) => {
  try {
    if (!validateName(name)) return;

    const data = await readContract({
      address: SELF_NFT_ADDR,
      abi: selfNftAbi,
      functionName: "isNameAvailable",
      args: [name],
    });
    return data;
  } catch (error) {
    return;
  }
};
