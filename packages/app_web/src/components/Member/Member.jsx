import {Avatar, Box, Button, HStack, IconButton, Spacer, Text, VStack} from "@chakra-ui/react";
import {DeleteIcon, EmailIcon} from "@chakra-ui/icons";


export default function Member({email, name, profilePic, onRemove, isOwner = false}) {
    const height = 200
    const width = 412

    return (
        <HStack borderWidth="1px" borderRadius="lg" maxW={width} minH={65} boxShadow="md">
                justifyItems={'left'} overflow={'hidden'} px={10} >
            <Avatar height={10} width={10} size={'sm'} name={name} src={profilePic} ml={4}/>
            <HStack pl={3} >
                <Text fontSize={14} noOfLines={2}>{name}</Text>
                <Text fontSize={14} as={'em'} color={'gray.600'}>{email}</Text>
            </HStack>
            <Spacer />
            {isOwner ? <Text as={'em'} fontSize={14} color={'gray.500'}>owner</Text>
                : onRemove ? <IconButton icon={<DeleteIcon />} bg={'red.400'} color={'white'} size={'xs'} onClick={onRemove} aria-label={'Delete member'}/>
                : <Text as={'em'} fontSize={14} color={'gray.500'}>member</Text>
            }
            <Box px={2} />
        </HStack>
    );
}

