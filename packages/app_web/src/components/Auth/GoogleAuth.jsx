import {useEffect} from 'react';
import {
    Button,
    Center,
    Text,
    useToast,
} from '@chakra-ui/react';
import {FcGoogle} from 'react-icons/fc';
import {initializeApp} from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import firebaseConfig from './firebase_secret.json';
import { useHistory } from 'react-router-dom';
import {generateErrorMessage } from '../../utils/toast'

import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import {handleErrors} from "./firebase-utils";

const GAuthButton = (props) => {
    const history = useHistory();
    const toast = useToast();

    const GooglePopup = () => {
        const app = initializeApp(firebaseConfig);
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                props.onAuth(
                    GoogleAuthProvider.credentialFromResult(result).accessToken,
                    result.user.uid,
                    result.user.displayName,
                    result.user.photoURL,
                    result.user.email
                );
                history.push('/')
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
        onAuth: (token, userID, displayName, profilePic, email) => dispatch(actions.authSuccess(token, userID, displayName, profilePic, email)),
    };
};

export default connect(null, mapDispatchToProps)(GAuthButton);

