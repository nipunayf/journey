import {
    Button,
    FormControl,
    HStack,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    ModalHeader,
    Switch,
    Text
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import {useFormik} from "formik";

export default function ReserveTheDates ({destinationName, parentFormik, setScreen}) {

    const formik = useFormik({
        initialValues: {
            startDate: parentFormik.values.startDate,
            endDate: parentFormik.values.endDate,
            isGroup: parentFormik.values.isGroup,
        },
        onSubmit: values => {
            parentFormik.setFieldValue('startDate', formik.values.startDate);
            parentFormik.setFieldValue('endDate', formik.values.endDate);
            parentFormik.setFieldValue('isGroup', formik.values.isGroup);
        }
    });

    const onChange = (dates) => {
        const [start, end] = dates;
        formik.setFieldValue('startDate', dates[0])
        formik.setFieldValue('endDate', dates[1])
    };


    return (<>
        <ModalHeader>Reserve the Dates</ModalHeader>
        <ModalCloseButton/>
        <ModalBody align={'center'}>
            <HStack justify={'center'} pb={3}>
                <Text as={'strong'}>Destination: </Text>
                <Text>{destinationName}</Text>
            </HStack>
            <Text as={'strong'}>Pick a Date Range:</Text>
            <DatePicker
                selected={formik.values.startDate}
                onChange={onChange}
                startDate={formik.values.startDate}
                endDate={formik.values.endDate}
                filterDate={date => date >= new Date()}
                selectsRange
                inline
            />
            <FormControl name={'isGroup'}>
                <HStack justify={'center'} pt={3}>
                    <Text>Individual</Text>
                    <Switch color={'secondary.main'} size="lg" isChecked={formik.values.isGroup} id={'isGroup'}
                            onChange={formik.handleChange}/>
                    <Text>Group</Text>
                </HStack>
            </FormControl>
        </ModalBody>
        <ModalFooter>
            <Button
                bg={'secondary.light'}
                color={'white'}
                onClick={() => {
                    formik.handleSubmit();
                    formik.values.isGroup ? setScreen(2) : setScreen(1)
                }}
                isDisabled={formik.values.endDate === null}
                _hover={{bg: 'blue.500'}}>
                Next
            </Button>
        </ModalFooter>
    </>);
}
