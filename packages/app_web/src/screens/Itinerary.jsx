import DestinationList from '../containers/Itinerary/DestinationList'
import Navbar from "../containers/Navbar/Navbar";
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";
import CreateItinerary from "../containers/CreateItinerary/CreateItinerary";

export default function Itinerary() {
    return(
        <>
            <Navbar/>
            <Box py={20}/>
            <Accordion defaultIndex={[0]} allowMultiple w={'50%'}>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                October 29, 2021
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <DestinationList/>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                October 29, 2021
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <DestinationList/>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            <CreateItinerary/>
        </>
    );
}
