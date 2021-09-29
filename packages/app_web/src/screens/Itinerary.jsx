import Members from '../containers/Itinerary/Members'
import NewDestination from '../containers/Itinerary/NewDestination'
import Navbar from "../containers/Navbar/Navbar";
import DateAccordion from "../containers/Itinerary/DateAccordion";
import {Accordion, Box, Button, HStack, Spacer, useToast} from "@chakra-ui/react";
import StateChangeButton from "../components/Itinerary/StateChangeButton";
import {useLocation} from "react-router-dom";
import {MdSave} from "react-icons/all";
import {useFormik} from "formik";
import * as Yup from "yup";
import {createItinerary} from "../api/itineraries-api";
import {generateErrorMessage, generateSuccessMessage} from "../utils/toast";
import {connect} from "react-redux";


function Itinerary({displayName}) {
    const location = useLocation();
    const itinerary = location.state.itinerary;
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
            <Box pt={24}/>
            <HStack spacing={3} px={4}>
                <NewDestination/>
                <Members/>
                <Spacer/>
                <StateChangeButton state={1}/>
                <Button
                    leftIcon={<MdSave/>}
                    bg={'green.400'}
                    color={'white'}
                    onClick={formik.handleSubmit}
                    _hover={{bg: 'green.500'}}>
                    Save
                </Button>
            </HStack>
            <Accordion defaultIndex={[0]} allowMultiple w={'45%'} pt={5} pl={4}>
                {Object.keys(itinerary.destinations).map(date => {
                    if (itinerary.destinations[date].length > 0)
                        return <DateAccordion date={date} destinations={itinerary.destinations[date]}/>;
                })}
            </Accordion>
        </>
    );
}

const mapStateToProps = state => {
    return {
        displayName: `${state.profile.firstName} ${state.profile.lastName}`
    };
};

export default connect(mapStateToProps, null)(Itinerary);
