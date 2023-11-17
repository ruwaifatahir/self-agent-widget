import { RepeatIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

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
    <IconButton
      icon={<RepeatIcon />}
      aria-label="Dark Mode"
      variant="outline"
      onClick={popupHandler}
    />
  );
};

export default RefreshAccountButton;
