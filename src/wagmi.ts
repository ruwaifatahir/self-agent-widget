import { createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { sepolia, bsc } from "viem/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

//---------------------Connectors--------------------------
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

//Get default chain
const environment = process.env.NODE_ENV;
const supportedChains = environment == "development" ? [sepolia] : [bsc];
const defaultChain = supportedChains[0];

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;
console.log(projectId);

// 2. Create wagmiConfig
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...supportedChains],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_RPC_URL!,
      }),
      // priority: 1,
    }),
    publicProvider(),
  ]
);

const metadata = {
  name: "Self Agent Widget",
  description:
    "Widget for Verified Agents to Resell Self Crypto Names and Earn Commission",
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
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
  ],
  publicClient,
  webSocketPublicClient,
});

// 3. Create modal
