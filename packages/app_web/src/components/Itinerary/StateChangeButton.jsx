import {StateEnum} from "../../utils/constants";
import {Button, useDisclosure, useToast} from "@chakra-ui/react";
import {MdHighlightOff, MdPlayArrow, MdRateReview} from "react-icons/all";
import {addReview, updateItinerary} from "../../api/itineraries-api";
import {generateErrorMessage, generateSuccessMessage} from "../../utils/toast";
import {useState} from "react";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import ReviewPopup from "./ReviewPopup";

function StateChangeButton({id, state, onStateUpdate, setState}) {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const onClick = (state, message) => async () => {
        //Updates the back-end firestore
        setLoading(true);
        console.log(id)
        const result = await updateItinerary(id, {state});
        if (result.data) {
            generateSuccessMessage(toast, 'Updated itinerary successfully', message);
            setState(state);
            onStateUpdate(id, state);
        } else {
            generateErrorMessage(toast, 'Unable to update the itinerary', result.message);
        }
        setLoading(false);
    }

    const onReviewInput = review => async () => {
        // Updates the back-end firestore
        const result = await addReview(id, review);
        if (result.data) {
            generateSuccessMessage(toast, 'Posted your review successfully', 'Thank you for your feedback');
            setState(StateEnum.REVIEWED);
            onStateUpdate(id, StateEnum.REVIEWED);
        } else {
            generateErrorMessage(toast, 'Unable to post your review', result.message);
        }
    }

    switch (state) {
        case(StateEnum.INACTIVE):
            return <Button
                leftIcon={<MdPlayArrow/>}
                bg={'green.400'}
                size={'sm'}
                color={'white'}
                isLoading={loading}
                onClick={onClick(StateEnum.ACTIVE, 'The itinerary is successfully activated')}
                _hover={{bg: 'green.500'}}>
                Activate
            </Button>
        case(StateEnum.INCOMPATIBLE):
            return <Button
                leftIcon={<MdPlayArrow/>}
                bg={'green.400'}
                size={'sm'}
                color={'white'}
                isLoading={loading}
                onClick={() => {
                }}
                isDisabled
                _hover={{bg: 'green.500'}}>
                Activate
            </Button>
        case(StateEnum.ACTIVE):
            console.log('repeating')
            return <Button
                leftIcon={<MdHighlightOff/>}
                bg={'red.400'}
                size={'sm'}
                color={'white'}
                isLoading={loading}
                onClick={onClick(StateEnum.INACTIVE, 'The itinerary is successfully deactivated')}
                _hover={{bg: 'red.500'}}>
                Deactivate
            </Button>
        case(StateEnum.TO_BE_REVIEWED):
            return <>
                <ReviewPopup onClose={onClose} isOpen={isOpen} onClick={onReviewInput}/>
                <Button
                    leftIcon={<MdRateReview/>}
                    bg={'secondary.light'}
                    size={'sm'}
                    color={'white'}
                    isLoading={loading}
                    onClick={onOpen}
                    _hover={{bg: 'blue.500'}}>
                    Review
                </Button>
                <Button
                    leftIcon={<MdHighlightOff/>}
                    bg={'red.400'}
                    size={'sm'}
                    color={'white'}
                    isLoading={loading}
                    onClick={onClick(StateEnum.INACTIVE, 'The itinerary is successfully deactivated')}
                    _hover={{bg: 'red.500'}}>
                    Deactivate
                </Button>
            </>
        default:
            return <></>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStateUpdate: (id, state) => dispatch(actions.updateState(id, state))
    };
};

export default connect(null, mapDispatchToProps)(StateChangeButton);
