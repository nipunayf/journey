import {Avatar, Box, Button, Flex, Heading, HStack, Stack, useColorModeValue, VStack} from "@chakra-ui/react";
import Navbar from "../containers/Navbar/Navbar";
import InputPreference from "../components/Form/InputPreference";
import InputBox from "../components/Form/InputBox";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";

function Preferences({formik}) {
    return <>
        <Heading size={"lg"} py={5}>Preferences</Heading>
        <VStack>
            <InputPreference
                defaultValue={"Average"}
                title={"Budget"}
                options={["Cheap", "Average", "Expensive"]}
                id={'budget'}
                formik={formik}/>
            <InputPreference
                defaultValue={"Moderate"}
                title={"Popularity"}
                options={["Hidden-Gem", "Moderate", "Popular"]}
                id={'popularity'}
                formik={formik}/>
            <InputPreference
                defaultValue={"Medium-Paced"}
                title={"Energy"}
                options={["Relaxing", "Medium-Paced", "Adventurous"]}
                id={'energy'}
                formik={formik}/>
            <InputPreference
                defaultValue={"Average"}
                title={"Knowledge"}
                options={["Entertaining", "Average", "Informational"]}
                id={'knowledge'}
                formik={formik}/>
        </VStack>
    </>;
}

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


function Settings({profilePic, displayName}) {
    const formik = useFormik({
        initialValues: {
            firstName: displayName.split(' ')[0],
            lastName: displayName.split(' ')[1],
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
                    <ProfileInfo formik={formik} profilePic={profilePic} displayName={displayName}/>
                    <Preferences formik={formik}/>
                </Box>
            </Stack>
        </Flex>
    </>
}

const mapStateToProps = state => {
    return {
        displayName: state.displayName,
        profilePic: state.profilePic
    };
};

export default connect(mapStateToProps, null)(Settings);

