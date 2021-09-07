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
import {FcGoogle} from 'react-icons/fc';
import {FaFacebook} from 'react-icons/fa';

export default function Login() {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'white')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                        <Image src={'journey-logo.png'} w={300} h={120}/>
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
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email"/>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password"/>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={'secondary.main'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                    <Text align={'center'} py={3}>Or</Text>

                    <Button w={'full'} colorScheme={'facebook'} leftIcon={<FaFacebook/>}>
                        <Center>
                            <Text>Continue with Facebook</Text>
                        </Center>
                    </Button>

                    <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle/>} mt={2}>
                        <Center>
                            <Text>Sign in with Google</Text>
                        </Center>
                    </Button>
                </Box>
            </Stack>
        </Flex>
    );
}
