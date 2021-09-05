import { extendTheme } from "@chakra-ui/react";

//defines the color palette
const colors = {
    primary: {
        main: '#fafafa',
        light: '#ffffff',
        dark: '#c7c7c7',
    },
    secondary: {
        main: '#0277bd',
        light: '#58a5f0',
        dark: '#004c8c',
    }
}

export default extendTheme({ colors });
