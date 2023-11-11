import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    body: "var(--font-inter)",
  },
  components: {
    styles: {
      global: {
        "html, body": {
          bg: "rgba(239, 207, 227, 0.2)",
        },
      },
    },

    Button: {
      variants: {
        primary: {
          bgGradient:
            "linear-gradient(90deg, #FF00AA 0%, #F500AE 18.23%, #9A00D2 51.56%, #3400FB 85.94%, #2B00FF 100%)",
          color: "white",
          rounded: "md",
          _hover: {
            bgGradient:
              "linear-gradient(90deg, #2B00FF 0%, #3400FB 18.23%, #9A00D2 51.56%, #F500AE 85.94%, #FF00AA 100%)",
            _disabled: {
              bgGradient:
                "linear-gradient(90deg, #2B00FF 0%, #3400FB 18.23%, #9A00D2 51.56%, #F500AE 85.94%, #FF00AA 100%)",
            },
          },
        },
      },
    },
  },
});
