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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from './firebase_secret.json';
import {initializeApp} from "firebase/app";
import { useHistory } from 'react-router-dom';

export default function SignUpAuth() {
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            history.push('/home');
            const app = initializeApp(firebaseConfig);
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    formik.setSubmitting(false)
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
            <FormControl id="firstName" isInvalid={formik.errors.firstName}>
                <FormLabel>First Name</FormLabel>
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                <Input type="name" value={formik.values.firstName} onChange={formik.handleChange}/>
            </FormControl>
            <FormControl id="lastName" isInvalid={formik.errors.lastName}>
                <FormLabel>Last Name</FormLabel>
                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                <Input type="name" value={formik.values.lastName} onChange={formik.handleChange}/>
            </FormControl>
            <FormControl id="email" isInvalid={formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                <Input type="email" value={formik.values.email} onChange={formik.handleChange}/>
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={formik.values.password} onChange={formik.handleChange}/>
            </FormControl>
            <Button
                bg={'secondary.main'}
                color={'white'}
                onClick={formik.handleSubmit}
                isDisabled={!formik.isValid}
                isLoading={formik.isSubmitting}
                _hover={{
                    bg: 'blue.500',
                }}>
                Register
            </Button>
        </Stack>
    );
}

