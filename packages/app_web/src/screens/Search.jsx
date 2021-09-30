import PlaceCard from "../containers/Search/PlaceCard";
import MainPlaceCard from "../containers/Search/MainPlaceCard";
import Navbar from "../containers/Navbar/Navbar";
import {useLocation} from "react-router-dom";
import {Flex, Heading, SimpleGrid, Stack} from "@chakra-ui/react";
import {getNearbyPlaces, getPlaceDetails} from "../api";
import React, {useEffect, useState} from "react";

export default function Search() {
    const [nearby, setNearby] = useState([1]);
    const [placeDetails, setDetails] = useState('');

    useEffect(async () => {
        await getDetails(placeId);
    }, [nearby]);

    const location = useLocation();

    const name = location.state.Name;
    const image = location.state.Image;
    const placeId = location.state.Id;

    async function getDetails(id) {
        const placeDetails = await getPlaceDetails(id);
        if (placeDetails.data) {
            setDetails(placeDetails.data);
            const data = {
                location: {
                    lat: placeDetails.data.geometry.location.lat,
                    lng: placeDetails.data.geometry.location.lng
                }
            }
            const nearby = await getNearbyPlaces(data);
            console.log(nearby)
            if (nearby.data) {
                setNearby(nearby.data);
            }

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
