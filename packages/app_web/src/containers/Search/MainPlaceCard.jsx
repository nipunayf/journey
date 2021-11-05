import React, {useEffect, useState} from "react";
import {Badge, Box, Button, Heading, HStack, Image, Stack, Text, VStack} from "@chakra-ui/react";
import {connect} from "react-redux";
import {getPlaceDescription} from '../../api'
import Rating from "../../components/Destination/Rating";
import CreateItinerary from "../CreateItinerary/CreateItinerary";

function MainPlaceCard(props) {
    const [description, setDescription] = useState('');
    const img = props.image ? props.image : 'https://www.couponraja.in/theroyale/wp-content/uploads/2017/12/cover-10-most-beautiful-places-in-sri-lanka-explore-the-emerald-island-632x480.jpg'

    const name = props.name ? props.name : "No Name"
    const types = props.placeDetails.types ? props.placeDetails.types : ['attraction'];

    const rating = props.placeDetails.rating ? props.placeDetails.rating : 0;
    const user_ratings_total = props.placeDetails.user_ratings_total ? props.placeDetails.user_ratings_total : '0';

    useEffect(() => {
        getDescription(name);
    }, [name])


    async function getDescription(name) {
        const description = await getPlaceDescription(name);
        if (description.data) {
            setDescription(description.data);
        } else
            setDescription('Cannot find the description')

    }

    return (
        <Stack>
            <Heading
                as="h1"
                size="lg"
                color="primary.800"
                opacity="1"
                fontWeight="normal"
                lineHeight={1.5}
                textAlign={"center"}
            >
                Welcome to {name}
            </Heading>
            <HStack paddingTop={5} spacing={2} align={'flex-start'} alignSelf={'left'}>
                <Box
                    minW='600px'
                    maxW='600px'
                    rounded='20px'
                    overflow='hidden'
                    boxShadow={"sm"}
                    bg={'grey.200'}
                    _hover={'lg'}>
                    <Image h="400px" objectFit={"cover"} src={img} alt={name} fallbackSrc='placeholder.jpg'/>
                    <Box p={5}>
                        <Stack isInline align={"baseline"}>
                            {types.map((object) => <Badge variant={"solid"} rounded={"full"} px={2}>{object}</Badge>)}
                        </Stack>
                        <Stack p={2} isInline justify={'space-between'}>
                        </Stack>
                    </Box>
                </Box>
                <VStack align={'left'}>
                    <Box w='600px'
                        pt={5}
                        px={2}
                        rounded='20px'
                        overflow='hidden'
                        boxShadow={"sm"}
                        bg={'grey.800'}
                        _hover={'lg'}>
                    <Text textAlign={"left"}>
                        {description}
                    </Text>
                </Box>
                    <HStack spacing={5} pl={2}>
                        {rating > 0 && <Rating number={rating}/>}
                        {user_ratings_total > 0 && <Text as={'h4'} fontSize={'sm'} fontWeight={'semibold'}>
                            {user_ratings_total} Reviews
                        </Text>}
                    </HStack>
                    {/*{rating > 0 && <CreateItinerary info={props.placeDetails}/>}*/}
                    {props.isAuthenticated && <CreateItinerary info={props.placeDetails}/>}
                </VStack>
            </HStack>
        </Stack>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps, null)(MainPlaceCard)
