import { DragDropContext } from 'react-beautiful-dnd';
import DestinationHorizontal from "../../components/Destination/DestinationHorizontal";
import {VStack} from "@chakra-ui/react";

export default function DestinationList () {
    return(
        <VStack spacing={5}>
            <DestinationHorizontal />
            <DestinationHorizontal />
            <DestinationHorizontal />
        </VStack>

    );
}
