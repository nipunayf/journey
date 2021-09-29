import Navbar from "../containers/Navbar/Navbar";

import ItineraryCard from '../components/Itinerary/ItineraryCard'
import {Box, Heading, HStack, VStack} from "@chakra-ui/react";
import {StateEnum} from "../utils/constants";
import CreateItinerary from "../containers/CreateItinerary/CreateItinerary";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import NoResultsSplash from "../components/Alert/NoResultsSplash";

const ItineraryContainer = ({title, children}) => {
    if (children.length > 0)
        return (
            <VStack py={2} mx={10} alignItems={'left'}>
                <Heading size={'lg'}>{title}...</Heading>
                <HStack spacing={4} overflowX={'auto'} py={2}>
                    {children.map(itinerary => <ItineraryCard id={itinerary.id} info={itinerary}/>)}
                </HStack>
            </VStack>
        );
    else return (<></>);
}

function Dashboard({itineraries}) {
    const [inactiveItineraries, setInactiveItineraries] = useState([]);
    const [incompatibleItineraries, setIncompatibleItineraries] = useState([]);
    const [activeItineraries, setActiveItineraries] = useState([]);
    const [tobereviewdItineraries, setToBeReviewedItineraries] = useState([]);

    useEffect(() => {
        const cache = [[], [], [], [], []]

        for (let id in itineraries) {
            switch (itineraries[id].state) {
                case StateEnum.INACTIVE:
                    cache[StateEnum.INACTIVE].push({...itineraries[id], id})
                    break;

                case StateEnum.INCOMPATIBLE:
                    cache[StateEnum.INCOMPATIBLE].push({...itineraries[id], id})
                    break;

                case StateEnum.ACTIVE:
                    cache[StateEnum.ACTIVE].push({...itineraries[id], id})
                    break;

                case StateEnum.TO_BE_REVIEWED:
                    cache[StateEnum.TO_BE_REVIEWED].push({...itineraries[id], id})
                    break;
            }

            setInactiveItineraries(cache[StateEnum.INACTIVE]);
            setIncompatibleItineraries(cache[StateEnum.INCOMPATIBLE]);
            setActiveItineraries(cache[StateEnum.ACTIVE]);
            setToBeReviewedItineraries(cache[StateEnum.TO_BE_REVIEWED]);
        }


    }, [itineraries]);


    return (<>
        <Navbar/>
        {Object.keys(itineraries).length === 0 ? <NoResultsSplash height={400}
                                                                  message={'You do not have any itineraries at the moment. Start creating a new itinerary by searching a destination'}/>
            : <>
                <Box py={10}/>
                <CreateItinerary/>
                <ItineraryContainer title={'Continue planning'} children={inactiveItineraries}/>
                <ItineraryContainer title={'Fix these'} children={incompatibleItineraries}/>
                <ItineraryContainer title={'Be ready for'} children={activeItineraries}/>
                <ItineraryContainer title={'Take your time to review these'} children={tobereviewdItineraries}/>
                <Box py={2}/>
            </>}
    </>)
}

const mapStateToProps = state => {
    return {
        itineraries: state.profile.itineraries,
    };
};

export default connect(mapStateToProps, null)(Dashboard);
