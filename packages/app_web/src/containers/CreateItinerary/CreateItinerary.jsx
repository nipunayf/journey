import {Button, Modal, ModalContent, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import {useState} from "react";

import 'react-datepicker/dist/react-datepicker.css';
import '../../components/Destination/datepicker.css';
import {useFormik} from "formik";
import ReserveDatesModal from './ReserveDatesModal'
import AddMembersModal from './AddMembersModal'
import ConfirmPreferencesModal from './ConfirmPreferencesModal'
import {connect} from "react-redux";
import generateItinerary from "../../utils/mock.json";
import {useHistory} from "react-router-dom";

function CreateItinerary({preferences}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [screen, setScreen] = useState(0);
    const history = useHistory();

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
            budget: preferences.budget,
            popularity: preferences.popularity,
            energy: preferences.energy,
            knowledge: preferences.knowledge,
            email: ''
        },
        onSubmit: values => {
            const itinerary = generateItinerary(values);
            console.log(itinerary);
            history.push(`/itinerary/${itinerary.id}`, { itinerary: itinerary });
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
                {screen === 0 ?
                    <ReserveDatesModal destinationName={property.name} setScreen={setScreen} parentFormik={formik}/> :
                    screen === 1 ?
                        <ConfirmPreferencesModal parentFormik={formik} setScreen={setScreen} onClose={onClose}/> :
                        <AddMembersModal setScreen={setScreen} parentFormik={formik}/>}
            </ModalContent>
        </Modal>
    </>;
}

const mapStateToProps = state => {
    return {
        preferences: state.profile.preferences,
    };
};

export default connect(mapStateToProps, null)(CreateItinerary);
