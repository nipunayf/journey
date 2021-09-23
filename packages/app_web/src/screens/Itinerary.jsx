import DestinationList from '../containers/Itinerary/DestinationList'
import Navbar from "../containers/Navbar/Navbar";
import {Box} from "@chakra-ui/react";
import CreateItinerary from "../containers/CreateItinerary/CreateItinerary";

export default function Itinerary() {
    return(
        <>
            <Navbar/>
            <Box py={20}/>
            <DestinationList/>
            <CreateItinerary/>
        </>
    );
}
