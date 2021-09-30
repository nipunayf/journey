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
import {useState} from "react";


function Itinerary({displayName}) {
    const location = useLocation();
    const itinerary = location.state.itinerary;
    const [defaultMarker, setDefaultMarker] = useState(Object.values(itinerary.destinations)[0][0]);
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            state: itinerary.state,
            destinations: itinerary.destinations,
        },

        onSubmit: async values => {
            //send the data to the firestore
            const result = await createItinerary({
                location: itinerary.name,
                image: itinerary.image,
                destinations: values.destinations,
                displayName
            })

            if (result.data) {
                generateSuccessMessage(toast, 'Itinerary saved', 'We have successfully saved your itinerary')
            } else {
                generateErrorMessage(toast, 'Failed to save the itinerary', result?.message)
            }
        }
    });


    return (
        <>
            <Navbar/>
            <Box pt={20}/>
            <HStack w={'100wh'} alignItems={'flex-start'} spacing={2} p={4}>
                <VStack alignItems={'left'} overflowY={'scroll'} h={'80vh'} w={'80%'}>
                    <HStack spacing={3} px={4}>
                        <NewDestination/>
                        <Members/>
                        <StateChangeButton state={1}/>
                        <Button
                            leftIcon={<MdSave/>}
                            bg={'green.400'}
                            color={'white'}
                            size={'sm'}
                            onClick={formik.handleSubmit}
                            _hover={{bg: 'green.500'}}>
                            Save
                        </Button>
                    </HStack>
                    <Accordion defaultIndex={[0]} allowMultiple minW={'45%'} pt={5} pl={4}>
                    {Object.keys(itinerary.destinations).map(date => {
                        if (itinerary.destinations[date].length > 0) {
                            console.log(defaultMarker)
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
        displayName: `${state.profile.firstName} ${state.profile.lastName}`
    };
};

export default connect(mapStateToProps, null)(Itinerary);
