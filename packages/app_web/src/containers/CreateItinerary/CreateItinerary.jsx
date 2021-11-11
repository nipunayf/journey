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

function CreateItinerary({preferences, info}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [screen, setScreen] = useState(0);
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            startDate: null,
            endDate: null,
            isGroup: false,
            budget: preferences.budget,
            popularity: preferences.popularity,
            energy: preferences.energy,
            knowledge: preferences.knowledge,
            introversion: preferences.introversion,
            members: []
        },
        onSubmit: values => {
            if (values.isGroup) {
                history.push('/')
            } else {

                const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
                const dates = [];
                let loop = new Date(values.startDate)
                let endDate = new Date(values.endDate)
                while (loop <= endDate) {
                    dates.push(loop.toLocaleDateString("en-US", options));
                    const newDate = loop.setDate(loop.getDate() + 1);
                    loop = new Date(newDate);
                }

                const data = {
                    dates,
                    numDays: Math.ceil(Math.abs(values.endDate - values.startDate) / (1000 * 60 * 60 * 24)) + 1,
                    preferences: {
                        budget: values.budget,
                        popularity: values.popularity,
                        energy: values.energy,
                        knowledge: values.knowledge,
                        introversion: values.introversion
                    },
                    placeID: info.place_id,
                    location: info.geometry.location
                }
                const itinerary = generateItinerary(values);
                history.push('/itinerary/', { itinerary: itinerary });
            }
        }

    });

    return <>
        <Button
            bg={'secondary.light'}
            size={'sm'}
            color={'white'}
            onClick={onOpen}
            maxW={120}
            ml={155}
            _hover={{bg: 'blue.500'}}>
            Create Itinerary
        </Button>
        <Modal onClose={onClose} size={'md'} isOpen={isOpen}>
            <ModalOverlay/>
            <ModalContent minW={600} minH={500}>
                {screen === 0 ?
                    <ReserveDatesModal destinationName={info.name} setScreen={setScreen} parentFormik={formik}/> :
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
