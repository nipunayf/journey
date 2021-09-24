import PlaceCard from "../containers/Search/PlaceCard";
import MainPlaceCard from "../containers/Search/MainPlaceCard";
import Navbar from "../containers/Navbar/Navbar";
import {useLocation} from "react-router-dom";
import {Badge, Flex, Heading, SimpleGrid, Stack} from "@chakra-ui/react";
import {getNearbyPlaces, getPlaceDescription, getPlaceDetails} from "../apis";
import React, {useEffect, useState} from "react";

export default function Search() {
    const [nearby,setNearby] = useState([1]);
    const [placeDetails,setDetails] = useState('');

    useEffect(()=>{
        getDetails(placeId);
    },[]);

    const location = useLocation();

    const image = location.state.Image;
    const placeId = location.state.Id;

    async function getDetails(id){
        const placeDetails = await getPlaceDetails(id);
        if(placeDetails){
            setDetails(placeDetails);
            const data = {
                location:{
                    lat:placeDetails.geometry.location.lat,
                    lng:placeDetails.geometry.location.lng
                }
            }
            const nearby = await getNearbyPlaces(data);
            if(nearby){
                setNearby(nearby);
            }

        }
    }

    return (
        <div>
            <Navbar/>
            <Flex paddingTop={20} paddingX={20} align={"center"}>
                <MainPlaceCard image={image} placeDetails={placeDetails} />
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
                <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing={10} paddingTop={10} paddingX={20}>
                    {nearby.map((object) => <PlaceCard {...object}/>)}

                </SimpleGrid>
            </Flex>
        </div>
    )
}
