import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";

/**
 * Graphical input box to update the formik parameters
 * @param id - formik property
 * @param name - display name of the property
 * @param formik - formik object
 * @param isPass - true if the input is password
 * @returns {JSX.Element}
 */
export default function InputBox({id, name, formik, isPass=false}) {
    return <FormControl id={id} isInvalid={formik.errors[id]}>
        <FormLabel>{name}</FormLabel>
        <FormErrorMessage>{formik.errors[id] ? formik.errors[id] : 'hello' }</FormErrorMessage>
        <Input type={isPass?'password':'name'} value={formik.values[id]} onChange={formik.handleChange}/>
    </FormControl>;
}
