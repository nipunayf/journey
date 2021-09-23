import Navbar from "../containers/Navbar/Navbar";

import ItineraryCard from '../components/Itinerary/Itinerary'
import {Box, Heading, HStack, VStack} from "@chakra-ui/react";

const ItineraryContainer = ({title, children}) => {
    return (
        <VStack py={2} mx={10} alignItems={'left'}>
            <Heading size={'lg'}>{title}...</Heading>
            <HStack spacing={4} overflowX={'scroll'} py={2}>
                {children}
            </HStack>
        </VStack>
    );
}

export default function Dashboard() {
    return (<>
        <Navbar/>
        <Box py={10}/>
        <ItineraryContainer title={'Be ready for'}>
            <ItineraryCard/>
            <ItineraryCard/>
        </ItineraryContainer>
        <ItineraryContainer title={'Continue planning'}>
            <ItineraryCard/>
            <ItineraryCard/>
            <ItineraryCard/>
            <ItineraryCard/>
        </ItineraryContainer>
        <ItineraryContainer title={'Take your time to review these'}>
            <ItineraryCard/>
            <ItineraryCard/>
        </ItineraryContainer>

    </>)
}
