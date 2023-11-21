import { Box, Text, VStack, useColorMode } from "@chakra-ui/react";
import Image from "next/image";

const HomeImage = () => {
  const { colorMode } = useColorMode();

  return (
    <Box backgroundImage={"url(/self-bg.svg)"} backgroundSize={"cover"}>
      <VStack gap={"18px"}>
        <Image
          src="/self.gif"
          alt="Self Crypto"
          width={115}
          height={115}
          priority
        />
        <Image
          src="/self-text-white.png"
          alt="Self Crypto"
          width={58}
          height={29}
          priority
          style={{
            filter: colorMode === "dark" ? "invert(0)" : "invert(1)",
          }}
        />
        <Text color={"#767676"} fontSize={"12px"}>
          Tired of complex and endless addresses?
        </Text>
      </VStack>
    </Box>
  );
};

export default HomeImage;
