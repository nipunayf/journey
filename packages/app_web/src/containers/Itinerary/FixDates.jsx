import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure, useToast
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {CalendarIcon} from "@chakra-ui/icons";
import {MdSave} from "react-icons/all";
import {shiftDates} from "../../api";
import {generateErrorMessage, generateSuccessMessage} from "../../utils/toast";

export default function FixDates({id, currentStartDate}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            startDate: currentStartDate,
        },
        onSubmit: async values => {
            const diff = Math.ceil((values.startDate - currentStartDate) / (1000 * 60 * 60 * 24));

            const result = await shiftDates(id, diff);
            if (result.data) {
                generateSuccessMessage(toast,'Updated the itinerary successfully', 'We have successfully shifted the dates of the itinerary')
            } else {
                generateErrorMessage(toast, 'Unable to update the dates', result.message)
            }

        }
    });

    const onChange = (date) => {
        formik.setFieldValue('startDate', date)
    };

    return (<>
        <Button
            leftIcon={<CalendarIcon/>}
            bg={'secondary.light'}
            color={'white'}
            size={'sm'}
            onClick={onOpen}
            _hover={{bg: 'blue.500'}}>
            Start
        </Button>
        <Modal onClose={onClose} size={'md'} isOpen={isOpen}>
            <ModalOverlay/>
            <ModalContent minW={500} minH={200}>
                <ModalHeader>Push the Start Date of the Itinerary</ModalHeader>
                <ModalCloseButton/>
                <ModalBody align={'center'}>
                    <DatePicker
                        selected={formik.values.startDate}
                        onChange={onChange}
                        startDate={formik.values.startDate}
                        filterDate={date => date >= new Date()}
                        inline
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        leftIcon={<MdSave/>}
                        bg={'secondary.light'}
                        color={'white'}
                        isDisabled={currentStartDate.getTime() === formik.values.startDate.getTime()}
                        onClick={formik.handleSubmit}
                        _hover={{bg: 'blue.500'}}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>);
}
