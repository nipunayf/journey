import PlaceCard from "../containers/Search/PlaceCard";
import MainPlaceCard from "../containers/Search/MainPlaceCard";
import Navbar from "../containers/Navbar/Navbar";
import {useLocation} from "react-router-dom";
import {Flex, Heading, SimpleGrid, Stack, useToast} from "@chakra-ui/react";
import {getNearbyPlaces, getPlaceDetails, getPlaceInfo} from "../api";
import React, {useEffect, useState} from "react";
import {generateErrorMessage} from "../utils/toast";

export default function Search() {
    const [nearby, setNearby] = useState([]);
    const [placeDetails, setDetails] = useState('');
    const toast = useToast();

    const location = useLocation();

    const name = location.state.Name;
    const image = location.state.Image;
    const placeId = location.state.Id;

    useEffect(() => {
        getDetails(placeId);
    }, [placeId])

    async function getDetails(id) {
        const result = await getPlaceInfo(id);
        if (result.data) {
            console.log(result.data)
            setDetails(result.data.place_details);
            setNearby(result.data.nearby);
        } else {
            generateErrorMessage(toast, 'Unable to fetch destinations', 'We were unable to find the destinations at the moment. Please try again later')
        }

    }

    return (
        <div>
            <Navbar/>
            <Flex paddingTop={20} paddingX={20} align={"center"}>
                <MainPlaceCard image={image} placeDetails={placeDetails} name={name}/>
            </Flex>
            <Stack paddingTop={5}>
                <Heading
                    as="h2"
                    size="md"
                    color="primary.800"
                    opacity="0.8"
                    fontWeight="normal"
                    lineHeight={1.5}
                    textAlign={"center"}
                >
                    Things to do around {placeDetails.name}
                </Heading>
            </Stack>
            <Flex>
                <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing={10} pt={5} px={5} pb={4}>
                    {nearby.map((object) => <PlaceCard {...object}/>)}
                </SimpleGrid>
            </Flex>
        </div>
    )
}
