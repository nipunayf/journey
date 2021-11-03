import {
    Text,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack
} from "@chakra-ui/react";
import {FaAngry, FaFrown, FaGrinHearts, FaMeh, FaSmile} from "react-icons/all";


function EmojiInput({onClick}) {
    return (
        <VStack spacing={5}>
            <Text size={'sm'} color={'gray.700'}>How well did you enjoy the itinerary that we have planned for you?</Text>
            <HStack justifyContent={'center'}>
                <IconButton size={'lg'} icon={<FaAngry/>} colorScheme={'blue'} aria-label={'Furious'} onClick={onClick(1)}/>
                <IconButton size={'lg'} icon={<FaFrown/>} colorScheme={'blue'} aria-label={'Sad'} onClick={onClick(2)}/>
                <IconButton size={'lg'} icon={<FaMeh/>} colorScheme={'blue'} aria-label={'Meh'} onClick={onClick(3)}/>
                <IconButton size={'lg'} icon={<FaSmile/>} colorScheme={'blue'} aria-label={'Happy'} onClick={onClick(4)}/>
                <IconButton size={'lg'} icon={<FaGrinHearts/>} colorScheme={'blue'} aria-label={'Awesome'} onClick={onClick(5)}/>
            </HStack>
        </VStack>
    );
}

export default function ReviewPopup({onClose, isOpen, onClick}) {

    return (
        <Modal onClose={onClose} size={'xs'} isOpen={isOpen}>
            <ModalOverlay/>
            <ModalContent minW={400} minH={225}>
                <ModalHeader>Rate Your Experience</ModalHeader>
                <ModalCloseButton/>
                <ModalBody alignItems={'center'}>
                    <EmojiInput onClick={onClick}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
