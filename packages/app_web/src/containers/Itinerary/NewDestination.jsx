import {
    Button, IconButton, Input, InputGroup, InputLeftElement, Link,
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
import {MdGroup} from "react-icons/all";
import {AddIcon, Search2Icon} from "@chakra-ui/icons";
import DestinationHorizontal from "../../components/Destination/DestinationHorizontal";

export default function NewDestination({displayName, profilePic}) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (<>
        <Button
            leftIcon={<AddIcon />}
            bg={'green.400'}
            color={'white'}
            onClick={onOpen}
            _hover={{bg: 'green.500'}}>
            Destination
        </Button>
        <Modal onClose={onClose} size={'md'} isOpen={isOpen}>
            <ModalOverlay/>
            <ModalContent minW={600} minH={500}>
                <ModalHeader>New Destination</ModalHeader>
                <ModalCloseButton/>
                <ModalBody alignItems={'center'}>
                    <InputGroup pt={1}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Search2Icon color="white.100"/>}
                            pt={2}
                        />
                        <Input
                            type="search"
                            placeholder="Search Destinations"
                            isRequired
                            // onChange={((e) => {setKeyword(e.target.value)}).bind(this)}
                            // value={keyword}
                            // onKeyPress={((e) => {if (e.key === 'Enter' && keyword.length !== 0) {history.push(`/search/${keyword}`, { keyword: keyword }); setKeyword('')}}).bind(this)}
                        />
                        <IconButton
                            icon={<Search2Icon/>}
                            // onClick={() => { if (keyword.length !== 0) {history.push(`/search/${keyword}`, { keyword: keyword }); setKeyword('')} }}
                            bg="secondary.light"
                            color="white"/>
                        <Link/>
                    </InputGroup>
                    <VStack w={"100%"} spacing={4} align={'left'} overflowY={'auto'} maxH={400} pt={10}>
                        <DestinationHorizontal isSelected/>
                        <DestinationHorizontal />
                        <DestinationHorizontal />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>);
}
