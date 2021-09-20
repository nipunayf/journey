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
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import firebaseConfig from './firebase_secret.json';
import {initializeApp} from "firebase/app";
import {useHistory} from 'react-router-dom';
import InputBox from "../Form/InputBox";
import {handleErrors} from "./firebase-utils";
import * as actions from "../../store/actions";
import {connect} from "react-redux";

function SignUpAuth(props) {
    const history = useHistory();
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            password: Yup.string().required('Required').min(6, 'Need at least 6 characters')
        }),
        onSubmit: values => {
            const app = initializeApp(firebaseConfig);
            let auth = getAuth();
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    props.onAuth(
                        user.accessToken,
                        user.uid,
                        `${formik.values.firstName} ${formik.values.lastName}`,
                        null,
                        user.email
                    );
                    auth = getAuth();
                    updateProfile(auth.currentUser, {
                        displayName: `${formik.values.firstName} ${formik.values.lastName}`
                    }).then(() => {
                        history.push('/');
                    }).catch((error) => {
                        handleErrors(toast, error.code);
                    });
                    formik.setSubmitting(false)
                    history.push('/');
                })
                .catch((error) => {
                    handleErrors(toast, error.code);
                    formik.setSubmitting(false)
                });
        }
    })

    return (
        <Stack spacing={4}>
            <InputBox id="firstName" name={"First Name"} formik={formik}/>
            <InputBox id="lastName" name={"Last Name"} formik={formik}/>
            <InputBox id="email" name={"Email"}formik={formik}/>
            <InputBox id="password" name={"Password"} formik={formik} isPass/>
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

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (token, userID, displayName, profilePic, email) => dispatch(actions.authSuccess(token, userID, displayName, profilePic, email)),
    };
};

export default connect(null, mapDispatchToProps)(SignUpAuth);

