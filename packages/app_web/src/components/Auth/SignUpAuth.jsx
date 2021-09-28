import {Button, Stack, useToast} from '@chakra-ui/react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth";
import firebaseConfig from './firebase_secret.json';
import {initializeApp} from "firebase/app";
import {useHistory} from 'react-router-dom';
import InputBox from "../Form/InputBox";
import {handleErrors} from "./firebase-utils";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {generateErrorMessage, generateSuccessMessage} from "../../utils/toast";
import {createUser} from "../../api";

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
                .then((result) => {
                    props.onAuth(
                        result.user.accessToken,
                        result.user.uid,
                        result.user.email
                    );

                    auth = getAuth();
                    updateProfile(auth.currentUser, {
                        displayName: `${values.firstName} ${values.lastName}`
                    }).then(async () => {
                        const newUser = await createUser({
                            userID: result.user.uid,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            profilePic: null,
                            email: result.user.email,
                        })
                        if (newUser.data) {
                            props.onProfileInit(
                                values.firstName,
                                values.lastName,
                                null,
                                {
                                    budget: 0,
                                    popularity: 0,
                                    energy: 0,
                                    knowledge: 0
                                },
                                null
                            )
                            props.onSuccess();
                            generateSuccessMessage(toast, 'Account created successfully', `Welcome ${values.firstName}, Start planning your itinerary by first searching your desired destination`);
                            history.push('/');
                        } else {
                            console.log('Profile Update FAILED')
                            generateErrorMessage(toast, 'Account creation failed', newUser.message);
                            props.onLogout();
                        }
                    }).catch((error) => {
                        handleErrors(toast, error.code);
                    });
                    formik.setSubmitting(false);
                })
                .catch((error) => {
                    console.log('Other FAILED')
                    handleErrors(toast, error.code);
                    formik.setSubmitting(false)
                });
        }
    })

    return (
        <Stack spacing={4}>
            <InputBox id="firstName" name={"First Name"} formik={formik}/>
            <InputBox id="lastName" name={"Last Name"} formik={formik}/>
            <InputBox id="email" name={"Email"} formik={formik}/>
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
        onAuth: (token, userID, email) => dispatch(actions.authLogin(token, userID, email)),
        onSuccess: () => dispatch(actions.authSuccess()),
        onLogout: () => dispatch(actions.logout()),
        onProfileInit: (firstName, lastName, profilePic, preferences, itineraries) => dispatch(actions.initializeProfile(firstName, lastName, profilePic, preferences, itineraries))
    };
};

export default connect(null, mapDispatchToProps)(SignUpAuth);

