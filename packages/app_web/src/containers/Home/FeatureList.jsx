import Feature from '../../components/Feature/Feature'
import {Box, SimpleGrid} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {
    FcClock,
    FcConferenceCall,
    FcCurrencyExchange,
    FcLandscape,
    FcSmartphoneTablet,
    FcSms
} from "react-icons/all";

export default function FeatureList () {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3}} spacing={10} p={8}>
            <Feature
                icon={<Icon as={FcClock} w={10} h={10} />}
                title={'24x7 Availability'}
                text={
                    'All the web services are available to the users at all times'
                }
            />
            <Feature
                icon={<Icon as={FcSms} w={10} h={10} />}
                title={'Keep Updated'}
                text={
                    'Receive notifications about upcoming trips and sudden changes to the itineraries'
                }
            />
            <Feature
                icon={<Icon as={FcCurrencyExchange} w={10} h={10} />}
                title={'Free of Charge'}
                text={
                    'All the services are available free of charge to the user'
                }
            />
            <Feature
                icon={<Icon as={FcConferenceCall} w={10} h={10} />}
                title={'Plan for Groups'}
                text={
                    'Create a travel itinerary based on the preferences of your family and friends'
                }
            />
            <Feature
                icon={<Icon as={FcSmartphoneTablet} w={10} h={10} />}
                title={'Dynamic Itinerary'}
                text={
                    'Get live updates to your itinerary at any time during your trip'
                }
            />
            <Feature
                icon={<Icon as={FcLandscape} w={10} h={10} />}
                title={'Weather Updates'}
                text={
                    'Be aware of any disrupting weather conditions to your itinerary'
                }
            />
        </SimpleGrid>
    );
}
