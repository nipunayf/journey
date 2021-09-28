import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, VStack} from "@chakra-ui/react";
import DestinationHorizontal from "../../components/Destination/DestinationHorizontal";


export default function DateAccordion({date, destinations}) {
    return(
        <AccordionItem>
            <h2>
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                        {date}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <VStack spacing={5}>
                    {destinations.map(destination => <DestinationHorizontal info={destination} id={destination.placeID} isRemove/>)}
                </VStack>
            </AccordionPanel>
        </AccordionItem>
    );
}
