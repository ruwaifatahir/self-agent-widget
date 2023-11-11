import { formatUnits } from "viem";

export function formatAnyAddress(str: string) {
  const firstFour = str.slice(0, 5);
  const lastThree = str.slice(-4);
  const formattedAddress = `${firstFour}...${lastThree}`;
  return formattedAddress;
}

export const validateName = (name: string) => {
  const regex = /^(?!_)(?!.*__)[a-z0-9_]{5,40}$/;
  // const regex = /^[a-z0-9_]{5,40}$/;
  // const regex = /^[a-z0-9_]+$/;

  return regex.test(name);
};

export function formatBigIntToNumber(number: bigint, uints: number = 18) {
  return Number(Number(formatUnits(number, uints)).toFixed(4));
}
