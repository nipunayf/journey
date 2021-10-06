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
            email: ''
        },
        onSubmit: values => {
            const itinerary = generateItinerary(values);
            console.log(itinerary);

            history.push('/itinerary/', { itinerary: itinerary });
        }

    });

    return <>
        <Button
            bg={'secondary.light'}
            size={'sm'}
            color={'white'}
            onClick={onOpen}
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
