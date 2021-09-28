import Members from '../containers/Itinerary/Members'
import NewDestination from '../containers/Itinerary/NewDestination'
import Navbar from "../containers/Navbar/Navbar";
import DateAccordion from "../containers/Itinerary/DateAccordion";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    HStack,
    Spacer
} from "@chakra-ui/react";
import StateChangeButton from "../components/Itinerary/StateChangeButton";
import {useLocation} from "react-router-dom";


export default function Itinerary() {
    const location = useLocation();
    const itinerary = location.state.itinerary;

    return(
        <>
            <Navbar/>
            <Box pt={24}/>
            <HStack spacing={3} px={4}>
                <NewDestination />
                <Members/>
                <Spacer />
                <StateChangeButton state={1}/>
            </HStack>
            <Accordion defaultIndex={[0]} allowMultiple w={'45%'} pt={5} pl={4}>
                {Object.keys(itinerary.destinations).map(date =>
                <DateAccordion date={date} destinations={itinerary.destinations[date]}/>)}
            </Accordion>
        </>
    );
}
