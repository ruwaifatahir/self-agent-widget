import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const ModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  if (colorMode === "light") {
    return (
      <IconButton
        icon={<MoonIcon />}
        aria-label="Dark Mode"
        variant="outline"
        onClick={toggleColorMode}
      />
    );
  }
  return (
    <IconButton
      icon={<SunIcon />}
      aria-label="Dark Mode"
      variant="outline"
      onClick={toggleColorMode}
    />
  );
};

export default ModeSwitcher;
