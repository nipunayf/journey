import React, {useEffect, useState} from "react";
import {Badge, Box, Button, Heading, HStack, Image, Stack, Text} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import {getPlaceDescription} from "../../apis";

export default function MainPlaceCard(props) {

    const [description,setDescription] = useState('');

    useEffect(()=>{
        getDescription(name);
    },[])

    console.log(props.placeDetails);

    const img = props.image ? props.image : 'https://www.couponraja.in/theroyale/wp-content/uploads/2017/12/cover-10-most-beautiful-places-in-sri-lanka-explore-the-emerald-island-632x480.jpg'
    const name = props.placeDetails.name ? props.placeDetails.name : 'SRI LANKA';

    const types = props.placeDetails.types ? props.placeDetails.types : ['attraction'];
    const rating = props.placeDetails.rating ? Math.round(props.placeDetails.rating) : 0;
    const user_ratings_total = props.placeDetails.user_ratings_total ?  props.placeDetails.user_ratings_total : '0';

    async function getDescription(name){
        const description = await getPlaceDescription(name);
        if(description){
            setDescription(description);
        }

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
            <HStack paddingTop={10} spacing={2}>
                <Box
                    w='600px'
                    rounded='20px'
                    overflow='hidden'
                    boxShadow={"sm"}
                    bg={'grey.200'}
                    _hover={'lg'}>
                    <Image h="400px" objectFit={"cover"} src={img} alt={name}/>
                    <Box p={5}>
                        <Stack isInline align={"baseline"}>
                            {types.map((object) => <Badge variant={"solid"} rounded={"full"} px={2}>{object}</Badge>)}
                            {/*<Badge variant={"solid"} rounded={"full"} px={2}>colombo</Badge>*/}
                            {/*<Badge variant={"solid"} rounded={"full"} px={2}>Attractive</Badge>*/}
                        </Stack>
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
                        {/*<Text as={'h2'} fontWeight={"semibold"} fontSize={"xl"} my={2}>{name}</Text>*/}
                        <Box paddingTop={5} textAlign={"center"}>
                            <Button variantColor={'teal'} size={'sm'} boxShadow={'sm'} _hover={{boxShadow: 'md'}}
                                    _active={{boxShadow: 'lg'}}>Create Itinerary
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box w='600px'
                     h='520px'
                     paddingX={2}
                     rounded='20px'
                     overflow='hidden'
                     boxShadow={"sm"}
                     bg={'grey.800'}
                     _hover={'lg'}>
                    <Text textAlign={"left"} >
                        {description}
                    </Text>
                </Box>
            </HStack>
        </Stack>

    );
}
