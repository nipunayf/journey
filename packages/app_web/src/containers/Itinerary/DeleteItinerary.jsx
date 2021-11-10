import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure, useToast,
    VStack
} from "@chakra-ui/react";
import {connect} from "react-redux";
import {DeleteIcon} from "@chakra-ui/icons";
import * as actions from "../../store/actions";
import {generateErrorMessage, generateSuccessMessage} from "../../utils/toast";
import {deleteItinerary} from "../../api";
import {useState} from "react";
import {useHistory} from "react-router-dom";

function DeleteItinerary({onRemove, id, name}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        const result = await deleteItinerary(id);
        if (result.data) {
            generateSuccessMessage(toast, 'Itinerary deleted successfully', `We have successfully removed the itinerary to '${name}' from your list`);
            onRemove(id);
            onClose();
            history.push('/');
        } else {
            generateErrorMessage(toast,'Unable to delete the itinerary', result.message);
        }
        setLoading(false);
    }

    return (<>
        <Button
            leftIcon={<DeleteIcon />}
            bg={'red.400'}
            size={'sm'}
            color={'white'}
            onClick={onOpen}
            _hover={{bg: 'red.500'}}>
            Delete
        </Button>
        <Modal onClose={onClose} size={'md'} isOpen={isOpen}>
            <ModalOverlay/>
            <ModalContent minW={500} minH={200} bg={'red.100'}>
                <ModalHeader>Do you wish to remove this itinerary?</ModalHeader>
                <ModalCloseButton/>
                <ModalBody alignItems={'center'}>
                    <Text>You cannot retrieve this itinerary once you deleted it. Do you wish to continue?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button
                        bg={'red.400'}
                        color={'white'}
                        onClick={onSubmit}
                        isLoading={loading}
                        _hover={{bg: 'red.500'}}>
                        Confirm
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>);
}

const mapDispatchToProps = dispatch => {
    return {
        onRemove: (id) => dispatch(actions.removeItinerary(id))
    };
};


export default connect(null, mapDispatchToProps)(DeleteItinerary);
