import {Badge, Box, Button, HStack, Image, Text} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";

export default function ItineraryCard() {
    const history = useHistory()

    const property = {
        imageUrl: "https://bit.ly/2Z4KKcF",
        days: 3,
        title: "Kandy",
        startDate: "27th December 2021",
        endDate: "30th December 2021"
    }

    const height = 370
    const width = 320
    return (
        <Box borderWidth="1px" borderRadius="lg" w={width} h={height} boxShadow="xl" minW={width}>
            <Image src={property.imageUrl} alt={property.title} htmlWidth={width} htmlHeight={height}/>

            <Box py="6" px={2}>
                <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="red">
                        Inactive
                    </Badge>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        {property.days} days
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
                    {property.title}
                </Box>
                <Box ml={2} fontSize={14} fontColor={'grey.700'}>
                    {`${property.startDate} ${String.fromCodePoint(parseInt('2192', 16))} ${property.endDate}`}
                </Box>
                <Button colorScheme="blue" size="sm" variant="outline" mt={3} ml={width / 2} onClick={() => history.push('/itinerary')}>
                    View Itinerary
                </Button>
            </Box>
        </Box>
    )
}
