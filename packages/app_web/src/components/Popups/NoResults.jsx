import {
    Alert,
    AlertIcon,
} from "@chakra-ui/react"

const NoResults = ({message}) => {
    return (
        <Alert status="info" borderRadius="1rem" h="20%" w="100%" minWidth="350px">
            <AlertIcon />
            {message}
        </Alert>
    );
}

export default NoResults;
