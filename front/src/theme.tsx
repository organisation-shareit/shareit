import {
  extendTheme,
  type ThemeConfig,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const colorScheme = "purple";

const customTheme = extendTheme(
  { config, colors: { customColorScheme: colorScheme } },
  withDefaultColorScheme({ colorScheme: colorScheme })
);

export default customTheme;
