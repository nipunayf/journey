import {Button, Modal, ModalContent, ModalOverlay, useDisclosure, useToast} from "@chakra-ui/react";
import {useState} from "react";

import 'react-datepicker/dist/react-datepicker.css';
import '../../components/Destination/datepicker.css';
import {useFormik} from "formik";
import ReserveDatesModal from './ReserveDatesModal'
import AddMembersModal from './AddMembersModal'
import ConfirmPreferencesModal from './ConfirmPreferencesModal'
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
// import generateItinerary from "../../utils/mock.json";
import {generateItinerary} from "../../api";
import {StateEnum} from "../../utils/constants";
import {generateErrorMessage, generateSuccessMessage} from "../../utils/toast";

function CreateItinerary({preferences, info}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [screen, setScreen] = useState(0);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const toast = useToast();

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
        onSubmit: async values => {
            setLoading(true);

            const preferences = {
                budget: values.budget,
                popularity: values.popularity,
                energy: values.energy,
                knowledge: values.knowledge,
                introversion: values.introversion
            }
            const preferencesKeys = Object.keys(preferences);

            if (values.isGroup) {
                values.members.forEach(member => {
                    preferencesKeys.forEach(key => {
                        preferences[key] += member.preferences[key]
                    })
                })
            }
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
                Dates: dates,
                number_dates: Math.ceil(Math.abs(values.endDate - values.startDate) / (1000 * 60 * 60 * 24)) + 1,
                preferences,
                place_id: info.place_id,
                location: info.geometry.location
            }

            const result = await generateItinerary(data);
            if (result.data) {
                const itinerary = {
                    destinations: result.data,
                    location: info.name,
                    image: info.photos[0].photo_reference,
                    state: StateEnum.INACTIVE,
                    memberInfo: values.members,
                    isGroup: values.isGroup
                }
                history.push('/itinerary/', {itinerary});
                generateSuccessMessage(toast, 'Itinerary creation successful', 'We have created an itinerary for you!');
            } else {
                generateErrorMessage(toast, 'Unable to create an itinerary', 'We are unable to create an itinerary at the moment. Please try again later.')
            }
            setLoading(false);
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
                        <ConfirmPreferencesModal parentFormik={formik} setScreen={setScreen} isLoading={loading}/> :
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
