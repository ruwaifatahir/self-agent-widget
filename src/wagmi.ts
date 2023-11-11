import { createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { sepolia } from "viem/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

//---------------------Connectors--------------------------
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { walletConnectProvider, EIP6963Connector } from "@web3modal/wagmi";

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;

// 2. Create wagmiConfig
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: process.env.NEXT_PUBLIC_RPC_URL!,
      }),
      // priority: 1,
    }),
    walletConnectProvider({ projectId }),
    publicProvider(),
  ]
);

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const wagmiConfig = createConfig({
  autoConnect: true,

  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: metadata.name },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });
