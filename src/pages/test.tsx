import React, { useEffect } from "react";
import { Address, useAccount } from "wagmi";

const Test = () => {
  const { connector, address } = useAccount();
  //   need to pass address and if injected wallet
  return (
    <>
      <IframeRenderer
        isInjectedWallet={
          connector?.id === "injected" || connector?.id === "eip6963"
        }
        address={address as Address}
      />
    </>
  );
};

export default Test;

interface IframeRendererProps {
  isInjectedWallet: boolean;
  address: Address;
}

const IframeRenderer = ({ isInjectedWallet, address }: IframeRendererProps) => {
  useEffect(() => {
    if (!isInjectedWallet) return;

    setTimeout(() => {
      document.querySelector("iframe")?.contentWindow?.postMessage(
        { type: "updateAccount", account: address },
        "*" // replace it with the url of the iframe later
      );
    }, 2000);
  }, [address, isInjectedWallet]);

  let iframeUrl;
  const environment = process.env.NODE_ENV;

  iframeUrl =
    "http://localhost:3000/?agent=0x14B4a2935fCcd6634e868Dc52c83e76A12eD6ec6";

  if (environment === "production") {
    iframeUrl =
      "https://self-agent-widget.vercel.app/?agent=0x14B4a2935fCcd6634e868Dc52c83e76A12eD6ec6";
  }

  return (
    <>
      <iframe
        height={700}
        width={400}
        src={iframeUrl}
        // replace the src with the url of the iframe later
      />
    </>
  );
};
