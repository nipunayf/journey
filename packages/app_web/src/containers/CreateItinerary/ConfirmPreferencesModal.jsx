import {Button, ModalBody, ModalCloseButton, ModalFooter, ModalHeader} from "@chakra-ui/react";
import Preferences from "../InputCollection/Preferences";
import {useFormik} from "formik";
import generateItinerary from '../../utils/mock.json';

export default function ({parentFormik, setScreen, isLoading}) {
    const formik = useFormik({
        initialValues: {
            budget: parentFormik.values.budget,
            popularity: parentFormik.values.popularity,
            energy: parentFormik.values.energy,
            knowledge: parentFormik.values.knowledge,
            introversion: parentFormik.values.introversion,
        },
        onSubmit: values => {
            parentFormik.setFieldValue('budget', formik.values.budget);
            parentFormik.setFieldValue('popularity', formik.values.popularity);
            parentFormik.setFieldValue('energy', formik.values.energy);
            parentFormik.setFieldValue('knowledge', formik.values.knowledge);
            parentFormik.setFieldValue('introversion', formik.values.introversion);
        }
    });

    return (<>
        <ModalHeader>Confirm Your Preferences</ModalHeader>
        <ModalCloseButton/>
        <ModalBody alignItems={'center'}>
            <Preferences formik={formik}/>
        </ModalBody>
        <ModalFooter>
            <Button
                bg={'secondary.light'}
                color={'white'}
                onClick={() => {
                    parentFormik.values.isGroup ? setScreen(2) : setScreen(0)
                }}
                mr={3}
                _hover={{bg: 'blue.500'}}>
                Previous
            </Button>
            <Button
                bg={'green.400'}
                color={'white'}
                onClick={() => {
                    formik.handleSubmit();
                    parentFormik.handleSubmit();
                }}
                isLoading={isLoading}
                _hover={{bg: 'green.500'}}>
                Create
            </Button>
        </ModalFooter>
    </>);

}
