import {Button, Center, Text, useToast,} from '@chakra-ui/react';
import {FcGoogle} from 'react-icons/fc';
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import firebaseConfig from './firebase_secret.json';
import {useHistory} from 'react-router-dom';
import {generateErrorMessage, generateSuccessMessage} from '../../utils/toast'

import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import {handleErrors} from "./firebase-utils";
import {createUser, getUser} from "../../api";

const GAuthButton = (props) => {
    const history = useHistory();
    const toast = useToast();

    const GooglePopup = () => {
        const app = initializeApp(firebaseConfig);
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(async (result) => {
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
                    props.onSuccess();
                    generateSuccessMessage(toast, 'Logged in successfully',
                        `Welcome back ${userResult.data.firstName}!`)
                    history.push('/');
                } else if(userResult.code === 404) {
                    //Creates a new user
                    const newUser = await createUser({
                        userID: result.user.uid,
                        firstName: result.user.displayName.split(' ')[0],
                        lastName: result.user.displayName.split(' ')[1],
                        profilePic: result.user.photoURL,
                        email: result.user.email,
                    })
                    if (newUser.data) {
                        props.onProfileInit(
                            result.user.displayName.split(' ')[0],
                            result.user.displayName.split(' ')[1],
                            result.user.photoURL,
                            {
                                budget: 0,
                                popularity: 0,
                                energy: 0,
                                knowledge: 0
                            },
                            null
                        )
                        props.onSuccess();
                        generateSuccessMessage(toast, 'Account created successfully', `Welcome ${result.user.displayName.split(' ')[0]}, Start planning your itinerary by first searching your desired destination`);
                        history.push('/');
                    } else {
                        generateErrorMessage(toast, 'Account creation failed', newUser.message);
                        props.onLogout();
                    }
                }
                else {
                    generateErrorMessage(toast, 'Something went wrong', userResult.message);
                }
            }).catch((error) => {
            handleErrors(toast, error.code);
        });
    }

    return (
        <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle/>} mt={2} onClick={GooglePopup}>
            <Center>
                <Text>Sign in with Google</Text>
            </Center>
        </Button>

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

export default connect(null, mapDispatchToProps)(GAuthButton);

