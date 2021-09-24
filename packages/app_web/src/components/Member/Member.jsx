import {Avatar, Box, Button, HStack, Spacer, Text, VStack} from "@chakra-ui/react";
import {EmailIcon} from "@chakra-ui/icons";


export default function Member({email, name, profilePic, isOwner = false}) {
    const height = 200
    const width = 400

    return (
        <HStack borderWidth="1px" borderRadius="lg" maxW={width} minH={65} boxShadow="md">
                justifyItems={'left'} overflow={'hidden'} px={10} >
            <Avatar height={10} width={10} size={'sm'} name={name} src={profilePic} ml={4}/>
            <HStack pl={3} pr={10}>
                <Text fontSize={14}>{name}</Text>
                <Text fontSize={14} as={'em'} color={'gray.600'}>{email}</Text>
            </HStack>
            <Spacer />
            {!isOwner? <Button bg={'red.400'} color={'white'} size={'xs'}>X</Button>
            : <Text as={'em'} fontSize={14} color={'gray.500'}>owner</Text>}
            <Box px={2} />
        </HStack>
    );
}

