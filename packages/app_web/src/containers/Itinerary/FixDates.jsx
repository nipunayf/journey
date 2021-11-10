import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import {CalendarIcon} from "@chakra-ui/icons";
import {MdSave} from "react-icons/all";

export default function FixDates({currentStartDate}) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const formik = useFormik({
        initialValues: {
            startDate: currentStartDate,
        },
        onSubmit: values => {
            console.log(values.startDate);
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
                        isDisabled={formik.values.startDate.getDay() === currentStartDate.getDay()}
                        onClick={formik.handleSubmit}
                        _hover={{bg: 'blue.500'}}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>);
}
