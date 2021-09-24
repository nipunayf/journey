import {Button, Heading, HStack, Image, Spacer, Text, useDisclosure, VStack} from "@chakra-ui/react";
import Rating from'./Rating'
import DestinationDrawer from './DestinationDrawer';

export default function DestinationHorizontal() {
    const height = 120
    const width = 240

    const property = {
        imageUrl: "https://bit.ly/2Z4KKcF",
        name: 'Peradeniya Botanical Garden',
        date: 'October 29, 2021',
        arrival: '8:00am',
        departure: '10:00am',
        description: 'Royal Botanic Gardens, Peradeniya are about 5.5 km to the west of the city of Kandy in the Central Province of Sri Lanka. In 2016, the garden was visited by 1.2 million locals and 400,000 foreign visitors. It is near the Mahaweli River. It is renowned for its collection of orchids',
        ratings: 3.5,
    }

    return (
        <HStack borderWidth="1px" borderRadius="lg" minW={width} maxW={520} h={height} boxShadow="xl" minW={width}
                justifyItems={'left'} overflow={'hidden'} pr={4}>
            <Image src={property.imageUrl} alt={property.title} htmlWidth={180} htmlHeight={180}/>
            <VStack alignItems={'left'} spacing={1}>
                <Heading size={'sm'}>
                    {property.name}
                </Heading>
                <Rating number={property.ratings}/>
                <Text fontSize={'sm'}>{property.date}</Text>
                <Text fontWeight="semibold"
                      fontSize={'sm'}>{`${property.arrival} ${String.fromCodePoint(parseInt('2192', 16))} ${property.departure}`}</Text>
            </VStack>
            <Spacer/>

            <DestinationDrawer
                property={property}
            />
        </HStack>
    );
}