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
    Center, Image,
    FormErrorMessage
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from './firebase_secret.json';
import {initializeApp} from 'firebase/app';
import { useHistory } from 'react-router-dom';

export default function SignInAuth() {
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            const app = initializeApp(firebaseConfig);
            const auth = getAuth();
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    formik.setSubmitting(false);
                    history.push('/')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode,errorMessage);
                    formik.setSubmitting(false)
                });
        }
    })

    return (
        <Stack spacing={4}>
            <FormControl id="email" isInvalid={formik.errors.email}>
                <FormLabel>Email address</FormLabel>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                <Input type="email" value={formik.values.email} onChange={formik.handleChange}/>
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={formik.values.password} onChange={formik.handleChange}/>
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
                    onClick={formik.handleSubmit}
                    isDisabled={!formik.isValid}
                    isLoading={formik.isSubmitting}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                    Sign in
                </Button>
            </Stack>
        </Stack>
    );
}

