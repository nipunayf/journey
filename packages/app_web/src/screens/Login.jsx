import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue, Center, Image,
} from '@chakra-ui/react';
import SignInAuth from '../components/Auth/SignInAuth';
import GAuthButton from '../components/Auth/GoogleAuth';
import {FaFacebook} from 'react-icons/fa';
import Footer from '../containers/Footer/Footer'

export default function Login() {
    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={'gray.50'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Link href={'/'}><Image src={'journey-logo.png'} w={300} h={120}/></Link>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            and start planning your own itinerary
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <SignInAuth />
                        <Text align={'center'} py={3}>Or</Text>
                        {/*TODO: Set facebook auth*/}
                        <Button w={'full'} colorScheme={'facebook'} leftIcon={<FaFacebook/>}>
                            <Center>
                                <Text>Continue with Facebook</Text>
                            </Center>
                        </Button>
                        <GAuthButton/>
                    </Box>
                </Stack>
            </Flex>
            <Footer/>
        </>
    );
}
