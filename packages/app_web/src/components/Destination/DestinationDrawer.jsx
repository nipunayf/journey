import {
    Button,
    Divider,
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
import {useEffect, useState} from "react";
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import {getPlaceDescription, getPlacePhoto} from "../../api/maps-api";

export default function DestinationDrawer({info, isRemove, select, date}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [startDate, setStartDate] = useState(new Date(date));
    const [startArrival, setStartArrival] = useState(new Date());
    const [description, setDescription] = useState('');

    const width = 360
    const height = 220

    //fetches the description when the component mounts
    useEffect(async () => {
        const result = await getPlaceDescription(info.name);
        if (result.data) {
            setDescription(result.data);
        } else {
            setDescription('Cannot find a description');
        }
    }, []);


    return (<>
        <Button variant={'outline'} size={'sm'} color={'secondary.main'} onClick={() => {
            onOpen();
            select(true);
        }}>
            View
        </Button>
        <Drawer onClose={() => {
            onClose();
            select(false)
        }} isOpen={isOpen} size={'md'}>
            <DrawerOverlay/>
            <DrawerContent bg={'primary.main'}>
                <DrawerHeader>
                    <HStack>
                        <VStack alignItems={'left'} spacing={1}>
                            <Text color={'black'}>{info.name}</Text>
                            <Rating number={info.rating}/>
                        </VStack>
                        <Spacer/>
                        {isRemove ? <Button colorScheme="red" size="sm">
                                Remove
                            </Button> :
                            <Button colorScheme="green" size="sm">
                                Add
                            </Button>}
                    </HStack>
                </DrawerHeader>
                <DrawerBody align={'center'}>
                    <Image borderWidth="1px" borderRadius="lg" src={getPlacePhoto(info.image)} alt={info.name} pb={3}
                           minW={width} maxW={width} minH={height} maxH={height}/>
                    <HStack>
                        <Heading size={'sm'} mr={4}>Date: </Heading>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat={"MMMM d, yyyy"}
                            fixedHeight
                            filterDate={date => date >= new Date()}/>
                    </HStack>
                    <HStack pt={3}>
                        <Heading size={'sm'}>Arrival: </Heading>
                        <DatePicker
                            selected={startArrival}
                            onChange={(date) => setStartArrival(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                        <Spacer/>
                        <Heading size={'sm'}>Departure: </Heading>
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
                    <Text pt={1} align={'left'}>{description}</Text>
                    <Heading pt={3} size={'md'} align={'left'}>Alternatives:</Heading>
                    <NoResult message={'Sorry! There are no alternatives for this destination'}/>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>);
}
