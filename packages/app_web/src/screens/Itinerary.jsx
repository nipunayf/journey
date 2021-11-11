import Members from '../containers/Itinerary/Members'
import Navbar from "../containers/Navbar/Navbar";
import DateAccordion from "../containers/Itinerary/DateAccordion";
import {Accordion, Box, Button, HStack, useToast, VStack} from "@chakra-ui/react";
import StateChangeButton from "../components/Itinerary/StateChangeButton";
import {useHistory, useLocation} from "react-router-dom";
import {MdSave} from "react-icons/all";
import {useFormik} from "formik";
import {createItinerary} from "../api/itineraries-api";
import {generateErrorMessage, generateSuccessMessage} from "../utils/toast";
import {connect} from "react-redux";
import MapContainer from "../containers/Maps/GoogleMaps";
import {useState} from "react";
import * as actions from "../store/actions";
import {StateEnum} from "../utils/constants";
import DeleteItinerary from "../containers/Itinerary/DeleteItinerary";
import FixDates from "../containers/Itinerary/FixDates";


function Itinerary({displayName, onAddItinerary}) {
    const location = useLocation();
    const itinerary = location.state.itinerary;
    const [defaultMarker, setDefaultMarker] = useState(Object.values(itinerary.destinations)[0][0]);
    const toast = useToast();
    const [buttonState, setButtonState] = useState(itinerary.state);
    const history = useHistory()


    const formik = useFormik({
        initialValues: {
            state: itinerary.state,
            destinations: itinerary.destinations,
        },

        onSubmit: async values => {
            formik.setSubmitting(true);
            console.log(itinerary.id);

            // Send the data to the firestore
            const result = await createItinerary({
                location: itinerary.location,
                image: itinerary.image,
                destinations: values.destinations,
                displayName
            })

            if (result.data) {
                generateSuccessMessage(toast, 'Itinerary saved', 'We have successfully saved your itinerary')
                const dates = Object.keys(itinerary.destinations);
                // Update the dashboard
                onAddItinerary(result.data, {
                    location: itinerary.location,
                    image: itinerary.image,
                    state: StateEnum.INACTIVE,
                    startDate: new Date(dates[0]),
                    endDate: new Date(dates.at(-1))
                });

                history.push(`/itinerary/${result.data}`, {
                    itinerary: {
                        id: result.data,
                        state: StateEnum.INACTIVE,
                        image: itinerary.image,
                        location: itinerary.location,
                        destinations: values.destinations,
                        members: itinerary.members,
                        memberInfo: itinerary.memberInfo
                    }
                });
            } else {
                generateErrorMessage(toast, 'Failed to save the itinerary', result.message)
            }
            formik.setSubmitting(false);
        }
    });


    return (
        <>
            <Navbar/>
            <Box pt={20}/>
            <HStack w={'100wh'} alignItems={'flex-start'} spacing={2} p={4}>
                <VStack alignItems={'left'} overflowY={'scroll'} h={'80vh'} w={'80%'}>
                    <HStack spacing={3} px={4}>
                        <Members/>
                        {itinerary.id === undefined && <Button
                            leftIcon={<MdSave/>}
                            bg={'secondary.light'}
                            color={'white'}
                            size={'sm'}
                            isLoading={formik.isSubmitting}
                            onClick={formik.handleSubmit}
                            _hover={{bg: 'blue.500'}}>
                            Save
                        </Button>}
                        {[StateEnum.INACTIVE, StateEnum.INCOMPATIBLE].indexOf(buttonState) > -1 && itinerary.id !== undefined &&
                        <FixDates id={itinerary.id} currentStartDate={new Date(Object.keys(itinerary.destinations)[0])}/>
                        }
                        {itinerary.id !== undefined &&
                        <StateChangeButton state={buttonState} id={itinerary.id} setState={setButtonState}/>}
                        {itinerary.id !== undefined && <DeleteItinerary id={itinerary.id} name={itinerary.location}/>}
                    </HStack>
                    <Accordion defaultIndex={[0]} allowMultiple minW={'45%'} pt={5} pl={4}>
                        {Object.keys(itinerary.destinations).map(date => {
                            if (itinerary.destinations[date].length > 0) {
                                return <DateAccordion date={date} destinations={itinerary.destinations[date]}
                                                      onHover={setDefaultMarker}/>;
                            }
                        })}
                    </Accordion>
                </VStack>
                <MapContainer markers={Object.values(itinerary.destinations).flat()} defaultMarker={defaultMarker}/>
            </HStack>
        </>
    );
}

const mapStateToProps = state => {
    return {
        itineraries: state.itineraries,
        displayName: `${state.profile.firstName} ${state.profile.lastName}`
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItinerary: (id, object) => dispatch(actions.addItinerary(id, object))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
