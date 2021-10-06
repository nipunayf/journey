import CSSMapMarker from "./CSSMapMarker";
import {Text, VStack, Box} from "@chakra-ui/react";


export default function MapMarker() {
    return(
        <VStack>
            <Text pb={10}>Hello</Text>
            <Text pb={50}>Hello</Text>
            <CSSMapMarker />
        </VStack>
    )
}
