import DestinationList from '../containers/Itinerary/DestinationList'
import Members from '../containers/Itinerary/Members'
import NewDestination from '../containers/Itinerary/NewDestination'
import Navbar from "../containers/Navbar/Navbar";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    HStack
} from "@chakra-ui/react";
import CreateItinerary from "../containers/CreateItinerary/CreateItinerary";
import {AddIcon} from "@chakra-ui/icons";
import {MdGroup} from "react-icons/all";


export default function Itinerary() {
    return(
        <>
            <Navbar/>
            <Box pt={24}/>
            <HStack spacing={3} pl={4}>
                <NewDestination />
                <Members/>
            </HStack>
            <Accordion defaultIndex={[0]} allowMultiple w={'45%'} pt={5} pl={4}>
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
