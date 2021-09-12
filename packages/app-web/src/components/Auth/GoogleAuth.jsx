import {useEffect} from 'react';
import {
    Button,
    Center,
    Text,
} from '@chakra-ui/react';
import {FcGoogle} from 'react-icons/fc';
import {initializeApp} from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import firebaseConfig from './firebase_secret.json';
import { useHistory } from 'react-router-dom';

export default function GAuthButton() {
    // Initialize Firebase
    const history = useHistory();

    const GooglePopup = () => {
        const app = initializeApp(firebaseConfig);
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                history.push('/');
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
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

