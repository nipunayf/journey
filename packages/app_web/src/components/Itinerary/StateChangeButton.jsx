import {StateEnum} from "../../utils/constants";
import {Badge, Button, useToast} from "@chakra-ui/react";
import {MdGroup, MdHighlightOff, MdPlayArrow, MdRateReview} from "react-icons/all";
import {updateItinerary} from "../../api/itineraries-api";
import {generateErrorMessage, generateSuccessMessage} from "../../utils/toast";
import {useState} from "react";
import * as actions from "../../store/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

function StateChangeButton({id, state, onStateUpdate, setState}) {
    const [message, setMessage] = useState('');
    const toast = useToast();

    const onClick = (state) => async () => {
        //Updates the back-end firestore
        const result = await updateItinerary(id, {state});
        if (result.data) {
            generateSuccessMessage(toast, 'Updated itinerary successfully', message);
            setState(state);
            onStateUpdate(id, state);
        } else {
            generateErrorMessage(toast, 'Unable to update the itinerary', result.message);
        }
    }

    switch (state) {
        case(StateEnum.INACTIVE):
            // setMessage('You have successfully activated your itinerary');
            return <Button
                leftIcon={<MdPlayArrow />}
                bg={'green.400'}
                size={'sm'}
                color={'white'}
                onClick={onClick(StateEnum.ACTIVE)}
                _hover={{bg: 'green.500'}}>
                Activate
            </Button>
            break;
        case(StateEnum.INCOMPATIBLE):
            return <Button
                leftIcon={<MdPlayArrow />}
                bg={'green.400'}
                size={'sm'}
                color={'white'}
                onClick={() => {}}
                isDisabled
                _hover={{bg: 'green.500'}}>
                Activate
            </Button>
            break;
        case(StateEnum.ACTIVE):
            // setMessage('You have successfully deactivated your itinerary');
            console.log('repeating')
            return <Button
                leftIcon={<MdHighlightOff />}
                bg={'red.400'}
                size={'sm'}
                color={'white'}
                onClick={onClick(StateEnum.INACTIVE)}
                _hover={{bg: 'red.500'}}>
                Deactivate
            </Button>
            break;
        case(StateEnum.TO_BE_REVIEWED):
            // setMessage('You have successfully posted a review');
            return <Button
                leftIcon={<MdRateReview />}
                bg={'secondary.light'}
                size={'sm'}
                color={'white'}
                onClick={onClick(5)}
                _hover={{bg: 'blue.500'}}>
                Review
            </Button>
            break;
        default:
            return <></>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStateUpdate: (id, state) => dispatch(actions.updateState(id, state))
    };
};

export default  connect( null, mapDispatchToProps )( StateChangeButton );
