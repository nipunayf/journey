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
import {getUser} from "../../api";
import {generateErrorMessage, generateSuccessMessage} from "../../utils/toast";

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
                .then(async result => {
                        props.onAuth(
                            result.user.accessToken,
                            result.user.uid,
                            result.user.email
                        );

                        //Check if the user is in the db
                        const userResult = await getUser(result.user.uid);
                        if (userResult.data) {
                            props.onProfileInit(
                                userResult.data.firstName,
                                userResult.data.lastName,
                                userResult.data.profilePic,
                                userResult.data.preferences,
                                userResult.data.itineraries
                            )
                            generateSuccessMessage(toast, 'Logged in successfully',
                                `Welcome back ${userResult.data.firstName}!`)
                            history.push('/');
                        } else {
                            generateErrorMessage(toast, 'Log-in failed', userResult.message)
                            props.onLogout();
                        }
                    }
                    )
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
            onAuth: (token, userID, email) => dispatch(actions.authSuccess(token, userID, email)),
            onLogout: () => dispatch(actions.logout()),
            onProfileInit: (firstName, lastName, profilePic, preferences, itineraries) => dispatch(actions.initializeProfile(firstName, lastName, profilePic, preferences, itineraries))
        };
    };

export default connect(null, mapDispatchToProps)(SignInAuth);

