import {
    Alert,
    AlertIcon,
} from "@chakra-ui/react"

const NoResults = ({height = 20, message}) => {
    return (
        <Alert status="info" borderRadius="1rem" minH={height} w="100%" minWidth="350px">
            <AlertIcon />
            {message}
        </Alert>
    );
}

export default NoResults;
