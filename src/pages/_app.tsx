import { useEffect, useState } from "react";
import type { AppProps } from "next/app";

//----------------Wagmi----------------
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "../wagmi";

//----------------Styles----------------
import "@/styles/globals.css";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { Inter } from "next/font/google";
import { Navbar } from "@/components";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <WagmiConfig config={wagmiConfig}>
        <ChakraProvider theme={theme}>
          {mounted && (
            <VStack w="full">
              <Navbar />
              <Component {...pageProps} />
            </VStack>
          )}
        </ChakraProvider>
      </WagmiConfig>
    </>
  );
}
