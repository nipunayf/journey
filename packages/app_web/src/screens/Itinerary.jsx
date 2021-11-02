import Members from '../containers/Itinerary/Members'
import NewDestination from '../containers/Itinerary/NewDestination'
import Navbar from "../containers/Navbar/Navbar";
import DateAccordion from "../containers/Itinerary/DateAccordion";
import {Accordion, Box, Button, HStack, VStack, useToast} from "@chakra-ui/react";
import StateChangeButton from "../components/Itinerary/StateChangeButton";
import {useLocation} from "react-router-dom";
import {MdSave} from "react-icons/all";
import {useFormik} from "formik";
import {createItinerary} from "../api/itineraries-api";
import {generateErrorMessage, generateSuccessMessage} from "../utils/toast";
import {connect} from "react-redux";
import MapContainer from "../containers/Maps/GoogleMaps";
import {useEffect, useState} from "react";
import * as actions from "../store/actions";
import {StateEnum} from "../utils/constants";


function Itinerary({displayName, onAddItinerary}) {
    const location = useLocation();
    const itinerary = location.state.itinerary;
    const [defaultMarker, setDefaultMarker] = useState(Object.values(itinerary.destinations)[0][0]);
    const toast = useToast();
    console.log(itinerary);
    const [buttonState, setButtonState] = useState(itinerary.state);
    const [id, setID] = useState(itinerary.id ? itinerary.id : '');


    const formik = useFormik({
        initialValues: {
            state: itinerary.state,
            destinations: itinerary.destinations,
        },

        onSubmit: async values => {
            formik.setSubmitting(true);
            //send the data to the firestore
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
                })
                setID(result.data);
            } else {
                generateErrorMessage(toast, 'Failed to save the itinerary', result?.message)
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
                        {/*<NewDestination/>*/}
                        <Members/>
                        <Button
                            leftIcon={<MdSave/>}
                            bg={'secondary.light'}
                            color={'white'}
                            size={'sm'}
                            isDisabled={id !== ''}
                            isLoading={formik.isSubmitting}
                            onClick={formik.handleSubmit}
                            _hover={{bg: 'blue.500'}}>
                            Save
                        </Button>
                        {id !== '' && <StateChangeButton state={buttonState} id={itinerary.id} setState={setButtonState}/>}
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
