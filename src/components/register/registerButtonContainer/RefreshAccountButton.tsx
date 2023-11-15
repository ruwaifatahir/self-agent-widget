import { Button } from "@chakra-ui/react";

const RefreshAccountButton = () => {
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

  return (
    <Button
      w="full"
      py={{ base: 6, md: 8 }}
      fontSize={{ base: "sm", md: "lg" }}
      variant="primary"
      onClick={popupHandler}
    >
      Refresh Account
    </Button>
  );
};

export default RefreshAccountButton;
