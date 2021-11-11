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
import {getItinerary, shiftDates} from "../../api";
import {generateErrorMessage, generateSuccessMessage} from "../../utils/toast";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {StateEnum} from "../../utils/constants";
import {useState} from "react";
import {useHistory} from "react-router-dom";

function FixDates({id, currentStartDate, setState, onStateUpdate, currentState, onDateUpdate}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();
    const [date, setDate] = useState(currentStartDate);
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            startDate: date,
        },
        onSubmit: async values => {
            const diff = Math.ceil((values.startDate - date) / (1000 * 60 * 60 * 24));

            const result = await shiftDates(id, diff);
            if (result.data) {
                onDateUpdate(id, diff);
                setDate(values.startDate)
                if (currentState === StateEnum.INCOMPATIBLE){
                    setState(StateEnum.INACTIVE);
                    onStateUpdate(id, StateEnum.INACTIVE);
                }
                const itResult = await getItinerary(id);
                if (itResult.data) {
                    history.push(`/itinerary/${id}`, { itinerary: itResult.data });
                    generateSuccessMessage(toast,'Updated the itinerary successfully', 'We have successfully shifted the dates of the itinerary')
                } else {
                    generateErrorMessage(toast, 'Unable to fetch the itinerary', result.message)
                    history.push('/')
                }
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
                        isDisabled={date.getTime() === formik.values.startDate.getTime()}
                        isLoading={formik.isSubmitting}
                        onClick={formik.handleSubmit}
                        _hover={{bg: 'blue.500'}}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>);
}

const mapDispatchToProps = dispatch => {
    return {
        onStateUpdate: (id, state) => dispatch(actions.updateState(id, state)),
        onDateUpdate: (id, diff) => dispatch(actions.updateDates(id, diff))
    };
};

export default connect(null, mapDispatchToProps)(FixDates);
