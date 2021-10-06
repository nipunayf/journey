import {ReactNode} from 'react';

import {
    Box,
    Container, Image,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box
            bg={'primary.dark'}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container as={Stack} maxW={'6xl'} py={8}>
                <SimpleGrid
                    templateColumns={{sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr'}}
                    spacing={8}>
                    <Stack>
                        <Image src={'dna-logo.png'} w={100} h={100}/>
                        <Text fontSize={'sm'}>
                            © 2021 Team DNA. All rights reserved
                        </Text>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Product</ListHeader>
                        <Link href={'#'}>Source Code</Link>
                        <Link href={'#'}>Features</Link>
                        <Link href={'#'}>Documents</Link>
                        <Link href={'#'}>Releases</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Company</ListHeader>
                        <Link href={'#'}>About</Link>
                        <Link href={'#'}>Contact</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Support</ListHeader>
                        <Link href={'#'}>Tutorials</Link>
                        <Link href={'#'}>Legal</Link>
                        <Link href={'#'}>Privacy Policy</Link>
                    </Stack>
                    <Stack align={'flex-start'} spacing={-3}>
                        <ListHeader>Available on</ListHeader>
                        <Image src={'badge_appstore.svg'} w={200} h={75}/>
                        <Image src={'badge_playstore.svg'} w={200} h={75}/>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    );
}

const ListHeader = ({children}) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

