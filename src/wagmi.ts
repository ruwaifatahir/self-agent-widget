import { createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { sepolia, bsc } from "viem/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

//---------------------Connectors--------------------------
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

//Get default chain
const environment = process.env.NODE_ENV;
const supportedChains = environment == "development" ? [sepolia] : [bsc];


// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;

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


export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
      },
    }),
    new InjectedConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
});


