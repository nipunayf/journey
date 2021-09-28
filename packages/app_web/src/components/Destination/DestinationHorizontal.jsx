import {Button, Heading, HStack, Image, Spacer, Text, useDisclosure, VStack} from "@chakra-ui/react";
import Rating from'./Rating'
import DestinationDrawer from './DestinationDrawer';
import {useState} from "react";
import {getPlacePhoto} from "../../api/maps-api";
import {formatTime} from "../../utils/date-format";

export default function DestinationHorizontal({isRemove, info}) {
    const height = 120
    const width = 520


    const [isSelected, select] = useState(false);

    return (
        <HStack borderWidth={isSelected ? "3px" : "1px"} borderRadius="lg" minW={width} maxW={width} minH={height} maxH={height} boxShadow="xl"
                justifyItems={'left'} overflow={'hidden'} pr={4} borderColor={isSelected ? 'secondary.main' : 'grey.700'}>
            <Image src={getPlacePhoto(info.image)} alt={info.title} htmlWidth={180} htmlHeight={180}/>
            <VStack alignItems={'left'} spacing={1}>
                <Heading pb={1.5} size={'sm'}>
                    {info.name}
                </Heading>
                <Rating number={info.rating}/>
                <Text fontWeight="semibold"
                      fontSize={'sm'}>{`${formatTime(info.arrival)} ${String.fromCodePoint(parseInt('2192', 16))} ${formatTime(info.departure)}`}</Text>
            </VStack>
            <Spacer/>

            <DestinationDrawer
                info={info}
                isRemove={isRemove}
                select={select}
            />
        </HStack>
    );
}
