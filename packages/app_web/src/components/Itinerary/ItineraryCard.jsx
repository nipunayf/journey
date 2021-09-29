import {Badge, Box, Button, HStack, Image, Text} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import Status from "./Status";
import {getPlacePhoto} from "../../api/maps-api";
import {formatDate} from "../../utils/date-format";

export default function ItineraryCard({info}) {
    const history = useHistory()

    const onViewMore = () => {
        //fetch itinerary from the database


        //route to itinerary page
        // history.push('/itinerary')
    }

    const IMAGE_HEIGHT = 220
    const BOX_WIDTH = 320
    const BOX_HEIGHT = 370
    return (
        <Box borderWidth="1px" borderRadius="lg" maxW={BOX_WIDTH} minH={BOX_HEIGHT} maxH={BOX_HEIGHT} boxShadow="xl" minW={BOX_WIDTH} overflow={'hidden'}>
            <Image src={getPlacePhoto(info.image)} alt={info.location} minW={BOX_WIDTH} maxH={IMAGE_HEIGHT} minH={IMAGE_HEIGHT}/>

            <Box py="6" px={2}>
                <Box d="flex" alignItems="baseline">
                    <Status state={info.state} />
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
                    {info.location}
                </Box>
                <Box ml={2} fontSize={14} fontColor={'grey.700'}>
                    {`${formatDate(info.startDate)} ${String.fromCodePoint(parseInt('2192', 16))} ${formatDate(info.endDate)}`}
                </Box>
                <Button colorScheme="blue" size="sm" variant="outline" mt={3} ml={BOX_WIDTH / 2} onClick={onViewMore}>
                    View Itinerary
                </Button>
            </Box>
        </Box>
    )
}
