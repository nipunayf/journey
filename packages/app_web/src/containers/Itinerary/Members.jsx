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
import {MdGroup} from "react-icons/all";

function Members({displayName, profilePic, email, members}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const memberIDs = Object.keys(members);

    return (<>
        <Button
            leftIcon={<MdGroup />}
            bg={'secondary.light'}
            size={'sm'}
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
                        {memberIDs.length > 0 && memberIDs.map(memberID => <Member email={members[memberID].email} name={members[memberID].displayName} profilePic={members[memberID].profilePic} isOwner={members[memberID].email === email}/>)}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>);
}


const mapStateToProps = state => {
    return {
        displayName: `${state.profile.firstName} ${state.profile.lastName}`,
        email: state.auth.email,
        profilePic: state.profile.profilePic,
    };
};

export default connect(mapStateToProps, null)(Members);
