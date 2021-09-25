import {StateEnum} from '../../utils/constants';
import {Badge} from "@chakra-ui/react";

export default function Status({state}) {
    switch (state) {
        case(StateEnum.INACTIVE):
            return <Badge borderRadius="full" px="2" colorScheme="blue">
                inactive
            </Badge>;
            break;
        case(StateEnum.INCOMPATIBLE):
            return <Badge borderRadius="full" px="2" colorScheme="red">
                incompatible
            </Badge>;
            break;
        case(StateEnum.ACTIVE):
            return <Badge borderRadius="full" px="2" colorScheme="green">
                active
            </Badge>;
            break;
        case(StateEnum.TO_BE_REVIEWED):
            return <Badge borderRadius="full" px="2" colorScheme="orange">
                to be reviewed
            </Badge>;
            break;
        case(StateEnum.REVIEWED):
            return <Badge borderRadius="full" px="2" colorScheme="purple">
                reviewed
            </Badge>;
            break;
        default:
            return <Badge borderRadius="full" px="2" colorScheme="red">
                unknown
            </Badge>;
    }
}
