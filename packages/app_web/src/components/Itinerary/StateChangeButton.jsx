import {StateEnum} from "../../utils/constants";
import {Badge, Button} from "@chakra-ui/react";
import {MdGroup, MdHighlightOff, MdPlayArrow, MdRateReview} from "react-icons/all";

export default function StateChangeButton({state}) {
    switch (state) {
        case(StateEnum.INACTIVE):
            return <Button
                leftIcon={<MdPlayArrow />}
                bg={'green.400'}
                size={'sm'}
                color={'white'}
                onClick={() => {}}
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
            return <Button
                leftIcon={<MdHighlightOff />}
                bg={'red.400'}
                size={'sm'}
                color={'white'}
                onClick={() => {}}
                _hover={{bg: 'red.500'}}>
                Deactivate
            </Button>
            break;
        case(StateEnum.TO_BE_REVIEWED):
            return <Button
                leftIcon={<MdRateReview />}
                bg={'secondary.light'}
                size={'sm'}
                color={'white'}
                onClick={() => {}}
                _hover={{bg: 'blue.500'}}>
                Review
            </Button>
            break;
        default:
            return <></>;
    }
}
