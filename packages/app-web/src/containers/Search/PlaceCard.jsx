import React, {useEffect, useState} from "react";
import {Badge, Box, Button, Image, Stack, Text} from "@chakra-ui/react";
import {Icon, StarIcon} from "@chakra-ui/icons";
import {getPlaceDescription, getPlacesPhoto} from "../../apis";

export default function PlaceCard(props) {



    // useEffect(async ()=>{
    //     if(props.name){
    //         const n = props.name;
    //         setName(n);
    //         const des = await getPlaceDescription(name);
    //
    //         if(des){
    //             setDescrip(des);
    //         }
    //
    //
    //
    //     }
    // },[name]);

    // const description = props.description ? props.description : 'Colombo International Financial City is a special ' +
    //     'economic zone and International Financial' +
    //     ' Centrelocated in Colombo, Sri Lanka,' +
    //     ' which is currently under construction on ' +
    //     'reclaimed land adjacent to the Galle Face Green.' +
    //     'The land reclamation work had been completed as of January 2018';
    const name = props.name;
    const descrip = props.description?props.description:"NO DESCRIPTION"
    const photoRef = props.photos ? props.photos[0].photo_reference: ' '
    const image =  props.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photo_reference=${photoRef}&key=AIzaSyATku-yiZOrGTDU50boXfuwX14EH88S1b0`: 'no image'

    let types = props.types ? props.types : ['attraction'];
    if (types.length > 2){
        types = types.splice(0,2);
    }
    const rating = props.rating ? Math.round(props.rating) : 0;
    const user_ratings_total = props.user_ratings_total ? props.user_ratings_total : '0';

    return (
        <Box
            w='400px'
            rounded='20px'
            overflow='hidden'
            boxShadow={"sm"}
            bg={'grey.200'}
            _hover={'lg'}>
            <Image maxH='200px' src={image} alt={name} align={"center"}/>
            <Box p={5}>
                <Stack isInline align={"baseline"}>
                    {types.map((object) => <Badge variant={"solid"} rounded={"full"} px={2}>{object}</Badge>)}
                </Stack>
                <Text as={'h2'} fontWeight={"semibold"} fontSize={"xl"} my={2}>{name}</Text>
                <Box as={"span"}>
                <Text fontWeight={"light"} fontSize={"md"} maxH='200px'>
                    {descrip}
                </Text>
                </Box>
                <Stack p={2} isInline justify={'space-between'}>
                        <Box >{Array(rating).fill('').map((_, i) => (
                            <StarIcon color={'gold'}/>
                        ))}
                            {Array(5-rating).fill('').map((_, i) => (
                            <StarIcon/>
                        ))}

                        </Box>
                        <Text as={'h4'} fontSize={'sm'} fontWeight={'semibold'}>
                            {user_ratings_total} Reviews
                        </Text>
                </Stack>
                <Box p={2} textAlign={"center"}>
                    <Button variantColor={'teal'} size={'sm'} boxShadow={'sm'} _hover={{boxShadow: 'md'}}
                            _active={{boxShadow: 'lg'}}>Create Itinerary
                    </Button>
                </Box>
            </Box>
        </Box>

    );
}
