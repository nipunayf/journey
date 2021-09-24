import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import Member from "../../components/Member/Member";
import {connect} from "react-redux";
import AddMembersModal from "../CreateItinerary/AddMembersModal";
import {MdGroup} from "react-icons/all";

function Members({displayName, profilePic}) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (<>
        <Button
            leftIcon={<MdGroup />}
            bg={'secondary.light'}
            color={'white'}
            onClick={onOpen}
            _hover={{bg: 'blue.500'}}>
            Members
        </Button>
        <Modal onClose={onClose} size={'md'} isOpen={isOpen}>
            <ModalOverlay/>
            <ModalContent minW={500} minH={500}>
                <ModalHeader>Members</ModalHeader>
                <ModalCloseButton/>
                <ModalBody alignItems={'center'}>
                    <VStack w={"100%"} spacing={4} align={'left'} overflowY={'auto'} maxH={180}>
                        <Member email={'test@test.com'} name={displayName} profilePic={profilePic} isOwner={true}/>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>);
}


const mapStateToProps = state => {
    return {
        displayName: state.displayName,
        profilePic: state.profilePic
    };
};

export default connect(mapStateToProps, null)(Members);
