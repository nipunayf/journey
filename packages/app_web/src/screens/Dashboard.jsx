import Navbar from "../containers/Navbar/Navbar";

import ItineraryCard from '../components/Itinerary/ItineraryCard'
import {Box, Heading, HStack, VStack} from "@chakra-ui/react";
import {StateEnum} from "../utils/constants";
import CreateItinerary from "../containers/CreateItinerary/CreateItinerary";

const ItineraryContainer = ({title, children}) => {
    return (
        <VStack py={2} mx={10} alignItems={'left'}>
            <Heading size={'lg'}>{title}...</Heading>
            <HStack spacing={4} overflowX={'auto'} py={2}>
                {children}
            </HStack>
        </VStack>
    );
}

export default function Dashboard() {
    return (<>
        <Navbar/>
        <Box py={10}/>
        <CreateItinerary/>
        <ItineraryContainer title={'Be ready for'}>
            <ItineraryCard state={StateEnum.ACTIVE}/>
            <ItineraryCard state={StateEnum.ACTIVE}/>
        </ItineraryContainer>
        <ItineraryContainer title={'Continue planning'}>
            <ItineraryCard state={StateEnum.INACTIVE}/>
            <ItineraryCard state={StateEnum.INACTIVE}/>
            <ItineraryCard state={StateEnum.INACTIVE}/>
            <ItineraryCard state={StateEnum.INACTIVE}/>
        </ItineraryContainer>
        <ItineraryContainer title={'Take your time to review these'}>
            <ItineraryCard state={StateEnum.TO_BE_REVIEWED}/>
            <ItineraryCard state={StateEnum.TO_BE_REVIEWED}/>
            <ItineraryCard state={StateEnum.TO_BE_REVIEWED}/>
        </ItineraryContainer>
    </>)
}
