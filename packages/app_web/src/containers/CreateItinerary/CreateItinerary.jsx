import {
    Button, Heading, HStack, Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Spacer, Switch, Text,
    useDisclosure, VStack
} from "@chakra-ui/react";
import Rating from "../../components/Destination/Rating";
import DestinationDrawer from "../../components/Destination/DestinationDrawer";
import {useState} from "react";
import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css';
import '../../components/Destination/datepicker.css';

export default function CreateItinerary() {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const property = {
        imageUrl: "https://bit.ly/2Z4KKcF",
        name: 'Peradeniya Botanical Garden',
        date: 'October 29, 2021',
        arrival: '8:00am',
        departure: '10:00am',
        description: 'Royal Botanic Gardens, Peradeniya are about 5.5 km to the west of the city of Kandy in the Central Province of Sri Lanka. In 2016, the garden was visited by 1.2 million locals and 400,000 foreign visitors. It is near the Mahaweli River. It is renowned for its collection of orchids',
        ratings: 4.6,
    }

    const ItineraryModal = () => {
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);
        const onChange = (dates) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
        };

        return (
            <Modal onClose={onClose} size={'md'} isOpen={isOpen}>
                <ModalOverlay/>
                <ModalContent minW={600} minH={500}>
                    <ModalHeader>Plan Your Itinerary</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody align={'center'}>
                        <HStack justify={'center'} pb={3}>
                            <Text as={'strong'}>Destination: </Text>
                            <Text>{property.name}</Text>
                        </HStack>
                        <Text as={'strong'}>Pick a Date Range:</Text>
                        <DatePicker
                            selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            filterDate={date => date >= new Date()}
                            selectsRange
                            inline
                        />
                        <HStack justify={'center'} pt={3}>
                            <Text>Individual</Text>
                            <Switch color={'secondary.main'} size="lg"/>
                            <Text>Group</Text>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            bg={'secondary.light'}
                            color={'white'}
                            onClick={onClose}
                            isDisabled={endDate===null}
                            _hover={{bg: 'blue.500'}}>
                            Next
                    </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    }

    return (<>
        <Button
            bg={'secondary.light'}
            size={'sm'}
            color={'white'}
            onClick={onOpen}
            _hover={{bg: 'blue.500'}}>
            Create Itinerary
        </Button>
        <ItineraryModal/>
    </>);
}
