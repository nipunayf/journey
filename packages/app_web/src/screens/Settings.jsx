import {Avatar, Box, Button, Flex, Heading, HStack, Stack, useColorModeValue, VStack} from "@chakra-ui/react";
import Navbar from "../containers/Navbar/Navbar";
import Preferences from '../containers/InputCollection/Preferences';
import InputBox from "../components/Form/InputBox";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {EmailIcon} from "@chakra-ui/icons";

function ProfileInfo({formik, profilePic, displayName}) {
    return <>
        <Heading size={"lg"} pb={5}>Profile Information</Heading>
        <HStack spacing={10} justifyContent={'center'} w={'100%'}>
            <Avatar size={'2xl'} name={displayName} src={profilePic}/>
            <VStack>
                <InputBox id="firstName" name={"First Name"} formik={formik}/>
                <InputBox id="lastName" name={"Last Name"} formik={formik}/>
            </VStack>
        </HStack>
    </>;
}


function Settings({profilePic, firstName, lastName}) {
    const formik = useFormik({
        initialValues: {
            firstName: firstName,
            lastName: lastName,
            budget: 'Average',
            popularity: 'Moderate',
            energy: 'Medium-Paced',
            knowledge: 'Average',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            budget: Yup.string(),
            popularity: Yup.string(),
            energy: Yup.string(),
            knowledge: Yup.string()
        }),
        onSubmit: values => {
            console.log(values)
        }
    });

    return <>
        <Navbar/>
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            pt={10}
            bg={'gray.50'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} alignItems={'center'}>
                <Heading fontSize={'4xl'}>Settings</Heading>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    minW={'90vh'}
                    p={8}>
                    <ProfileInfo formik={formik} profilePic={profilePic} displayName={`${firstName} ${lastName}`}/>
                    <Heading size={"lg"} py={5}>Preferences</Heading>
                    <Preferences formik={formik}/>
                    <Box py={3}/>
                    <Button
                        bg={'secondary.light'}
                        color={'white'}
                        w={350}
                        mx={'15%'}
                        onClick={() => {
                        }}
                        my={4}
                        _hover={{bg: 'blue.500'}}>
                        Save
                    </Button>
                </Box>
            </Stack>
        </Flex>
    </>
}

const mapStateToProps = state => {
    return {
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        profilePic: state.profile.profilePic
    };
};

export default connect(mapStateToProps, null)(Settings);

