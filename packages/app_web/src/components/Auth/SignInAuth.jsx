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
    FormErrorMessage, useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword} from "firebase/auth";
import firebaseConfig from './firebase_secret.json';
import {initializeApp} from "firebase/app";
import { useHistory } from 'react-router-dom';
import InputBox from "../Form/InputBox";
import {handleErrors} from "./firebase-utils";
import * as actions from "../../store/actions";
import {connect} from "react-redux";

function SignInAuth(props) {
    const history = useHistory();
    const toast = useToast();

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
                    props.onAuth(
                        user.accessToken,
                        user.uid,
                        user.displayName,
                        user.photoURL,
                        user.email
                    );
                    console.log(user);
                    history.push('/')
                })
                .catch((error) => {
                    handleErrors(toast, error.code);
                    formik.setSubmitting(false)
                });
        }
    })

    return (
        <Stack spacing={4}>
            <InputBox id="email" name={"Email"}formik={formik}/>
            <InputBox id="password" name={"Password"} formik={formik} isPass/>
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

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (token, userID, displayName, profilePic, email) => dispatch(actions.authSuccess(token, userID, displayName, profilePic, email)),
    };
};

export default connect(null, mapDispatchToProps)(SignInAuth);

