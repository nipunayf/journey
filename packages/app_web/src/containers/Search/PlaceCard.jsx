import React from "react";
import {Box, Button, Image, Text} from "@chakra-ui/react";
import {getPlacePhoto} from "../../api";
import Rating from "../../components/Destination/Rating";
import CreateItinerary from "../CreateItinerary/CreateItinerary";

export default function PlaceCard(props) {
    const name = props.name;
    const description = props.description ? props.description : "NO DESCRIPTION"
    const photoRef = props.photos ? props.photos[0].photo_reference : ' '
    const image = props.photos ? getPlacePhoto(photoRef) : 'no-image'

    const IMAGE_HEIGHT = 220
    const BOX_WIDTH = 310
    const BOX_HEIGHT = 370

    let types = props.types ? props.types : ['attraction'];
    if (types.length > 2) {
        types = types.splice(0, 2);
    }
    const rating = props.rating
    const user_ratings_total = props.user_ratings_total ? props.user_ratings_total : '0';

    return (
        <Box borderWidth="1px" borderRadius="lg" maxW={BOX_WIDTH} minH={BOX_HEIGHT} maxH={BOX_HEIGHT} boxShadow="xl"
             minW={BOX_WIDTH} overflow={'hidden'}>
            <Image src={image} alt={name} minW={BOX_WIDTH} maxH={IMAGE_HEIGHT} minH={IMAGE_HEIGHT} fallbackSrc='placeholder.jpg'/>
            <Box py="6" px={2}>
                <Box d="flex" alignItems="baseline">
                    <Text as={'h4'} fontSize={'sm'} fontWeight={'semibold'}>
                        {user_ratings_total} Reviews
                    </Text>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        1 days
                    </Box>
                </Box>

                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                    ml={2}
                >
                    {name}
                </Box>
                <Box ml={2} fontSize={14} fontColor={'grey.700'}>
                    <Rating number={rating}/>
                </Box>
                <CreateItinerary />
            </Box>
        </Box>
    )

}
