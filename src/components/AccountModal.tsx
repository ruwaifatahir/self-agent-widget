import { useWalletModalStore } from "@/stores/useWalletStore";
import { SELF_TKN_ADDR } from "@/utils/constants/addresses";
import { formatBigIntToNumber } from "@/utils/helpers";
import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { CloseIcon, RepeatIcon } from "@chakra-ui/icons";
const popupHandler = async () => {
  await (window as any).ethereum.request({
    method: "wallet_requestPermissions",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
};

function AccountModal() {
  const { colorMode } = useColorMode();
  const { connector } = useAccount();

  const isAccountModalOpen = useWalletModalStore(
    (state) => state.isAccountModalOpen
  );
  const setIsAccountModalOpen = useWalletModalStore(
    (state) => state.setIsAccountModalOpen
  );

  const { address } = useAccount();

  const { data = { value: BigInt(0) } } = useBalance({
    address,
    token: SELF_TKN_ADDR,
  });

  const balance = formatBigIntToNumber(data.value);

  const { disconnect } = useDisconnect();

  const disconnectWalletHandler = () => {
    disconnect();
    setIsAccountModalOpen(false);
  };

  const imgBgColor = useColorModeValue("#CDCDCD", "#38424E");
  const btnBgColor = useColorModeValue("#D8D8D8", "#4a546180");
  return (
    <>
      <Modal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent width={"95%"} maxWidth={"350px"}>
          <ModalCloseButton />
          <ModalBody
            py={"23px"}
            px={"18px"}
            display="flex"
            justifyContent={"center"}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width={"100%"}
            >
              <Box
                width={"54px"}
                height={"54px"}
                borderRadius={"50%"}
                backgroundColor={imgBgColor}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={
                    colorMode === "light"
                      ? "/wallet-black.svg"
                      : "/wallet-white.svg"
                  }
                  alt=""
                />
              </Box>
              <Text mt={4} fontWeight={600} fontSize={"20px"} lineHeight={3}>
                0xb33...b5cD
              </Text>
              <Text mt={3} fontWeight={300} lineHeight={3} fontSize={"12px"}>
                {balance} SELF
              </Text>
              <HStack gap={"10px"} mt={5} width={"100%"}>
                <Button
                  py={"9px"}
                  display="flex"
                  flexDirection={"column"}
                  alignItems={"center"}
                  backgroundColor={btnBgColor}
                  onClick={popupHandler}
                  height={"45px"}
                  flex={1}
                  isDisabled={connector && connector?.id !== "injected"}
                >
                  <RepeatIcon width={"14px"} />
                  <Text fontSize={"12px"} fontWeight={500} mt={1}>
                    Change Account
                  </Text>
                </Button>
                <Button
                  py={"9px"}
                  display="flex"
                  flexDirection={"column"}
                  alignItems={"center"}
                  backgroundColor={btnBgColor}
                  height={"45px"}
                  flex={1}
                  onClick={disconnectWalletHandler}
                >
                  <CloseIcon width={"12px"} />
                  <Text fontSize={"12px"} fontWeight={500} mt={1}>
                    Disconnect
                  </Text>
                </Button>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AccountModal;
