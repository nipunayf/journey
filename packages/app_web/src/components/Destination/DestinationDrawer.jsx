import {
    Button, Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
    Image,
    Spacer,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react"
import Rating from './Rating'
import NoResult from '../Alert/NoResults'
import {useState} from "react";
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

export default function DestinationDrawer({property}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [startDate, setStartDate] = useState(new Date(property.date));
    const [startArrival, setStartArrival] = useState(new Date());

    return (<>
        <Button variant={'outline'} size={'sm'} color={'secondary.main'} onClick={onOpen}>
            View
        </Button>
        <Drawer onClose={onClose} isOpen={isOpen} size={'md'}>
            <DrawerOverlay/>
            <DrawerContent bg={'primary.main'}>
                <DrawerHeader>
                    <HStack>
                        <VStack alignItems={'left'} spacing={1}>
                            <Text color={'black'}>{property.name}</Text>
                            <Rating number={property.ratings}/>
                        </VStack>
                        <Spacer/>
                        <Button colorScheme="red" size="sm">
                            Remove
                        </Button>
                    </HStack>
                </DrawerHeader>
                <DrawerBody align={'center'}>
                    <Image borderWidth="1px" borderRadius="lg" src={property.imageUrl} alt={property.title} pb={3}
                           htmlWidth={360} htmlHeight={180}/>
                    <HStack>
                        <Heading size={'sn'} mr={4}>Date: </Heading>
                        <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat={"MMMM d, yyyy"}
                        fixedHeight
                        filterDate={date => date >= new Date()}/>
                    </HStack>
                    <HStack pt={3}>
                        <Heading size={'sn'}>Arrival: </Heading>
                        <DatePicker
                            selected={startArrival}
                            onChange={(date) => setStartArrival(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                        <Spacer />
                        <Heading size={'sn'}>Departure: </Heading>
                        <DatePicker
                            selected={startArrival}
                            onChange={(date) => setStartArrival(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </HStack>
                    <Divider pt={3}/>
                    <Text pt={1} align={'left'}>{property.description}</Text>
                    <Heading pt={3} size={'md'} align={'left'}>Alternatives:</Heading>
                    <NoResult message={'Sorry! There are no alternatives for this destination'}/>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>);
}
