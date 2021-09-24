import {
    Button,
    FormControl, FormErrorMessage, FormLabel,
    HStack, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Switch,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {useState} from "react";
import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css';
import '../../components/Destination/datepicker.css';
import Preferences from "../InputCollection/Preferences";
import {useFormik} from "formik";
import ReserveDatesModal from './ReserveDatesModal'
import AddMembersModal from './AddMembersModal'
import ConfirmPreferencesModal from './ConfirmPreferencesModal'

export default function CreateItinerary() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [screen, setScreen] = useState(0);

    const property = {
        imageUrl: "https://bit.ly/2Z4KKcF",
        name: 'Peradeniya Botanical Garden',
        date: 'October 29, 2021',
        arrival: '8:00am',
        departure: '10:00am',
        description: 'Royal Botanic Gardens, Peradeniya are about 5.5 km to the west of the city of Kandy in the Central Province of Sri Lanka. In 2016, the garden was visited by 1.2 million locals and 400,000 foreign visitors. It is near the Mahaweli River. It is renowned for its collection of orchids',
        ratings: 4.6,
    }

    const formik = useFormik({
        initialValues: {
            startDate: null,
            endDate: null,
            isGroup: false,
            budget: 'Average',
            popularity: 'Moderate',
            energy: 'Medium-Paced',
            knowledge: 'Average',
            email: ''
        },
        onSubmit: values => {
            console.log(values)
        }
    });

    return <>
        <Button
            bg={'secondary.light'}
            size={'sm'}
            color={'white'}
            onClick={onOpen}
            _hover={{bg: 'blue.500'}}>
            Create Itinerary
        </Button>
        <Modal onClose={onClose} size={'md'} isOpen={isOpen}>
            <ModalOverlay/>
            <ModalContent minW={600} minH={500}>
                {screen === 0 ? <ReserveDatesModal destinationName={property.name} setScreen={setScreen} parentFormik={formik}/> :
                    screen === 1 ? <ConfirmPreferencesModal parentFormik={formik} setScreen={setScreen} onClose={onClose}/> :
                        <AddMembersModal setScreen={setScreen} parentFormik={formik}/>}
            </ModalContent>
        </Modal>
    </>;
}