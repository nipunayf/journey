import {Avatar, Box, Button, Flex, Heading, HStack, Stack, useColorModeValue, useToast, VStack} from "@chakra-ui/react";
import Navbar from "../containers/Navbar/Navbar";
import Preferences from '../containers/InputCollection/Preferences';
import InputBox from "../components/Form/InputBox";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {updateUser} from '../api';
import {generateErrorMessage, generateSuccessMessage} from "../utils/toast";
import * as actions from "../store/actions";

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


function Settings({profilePic, firstName, lastName, preferences, userID, onProfileUpdate}) {
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            firstName: firstName,
            lastName: lastName,
            budget: preferences.budget,
            popularity: preferences.popularity,
            energy: preferences.energy,
            knowledge: preferences.knowledge,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required').max(20, 'Should be less than 20 characters'),
            lastName: Yup.string().required('Required').max(20, 'Should be less than 20 characters'),
        }),
        onSubmit: async values => {
            const outputPreferences = {
                budget: values.budget,
                popularity: values.popularity,
                energy: values.energy,
                knowledge: values.knowledge
            };

            const result = await updateUser(userID, {
                firstName: values.firstName,
                lastName: values.lastName,
                preferences: outputPreferences
            });

            if (result.data) {
                generateSuccessMessage(toast, 'Account updated successfully',
                    'We have successfully updated your profile');
                onProfileUpdate(values.firstName, values.lastName, outputPreferences);
            } else {
                generateErrorMessage(toast, 'Account update failed', result.message);
            }
            formik.setSubmitting(false)
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
                        isDisabled={(firstName === formik.values.firstName
                        && lastName === formik.values.lastName
                        && preferences.budget === formik.values.budget
                        && preferences.popularity === formik.values.popularity
                        && preferences.energy === formik.values.energy
                        && preferences.knowledge === formik.values.knowledge)
                        || !formik.isValid}
                        onClick={formik.handleSubmit}
                        isLoading={formik.isSubmitting}
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
        userID: state.auth.user,
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        profilePic: state.profile.profilePic,
        preferences: state.profile.preferences
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (firstName, lastName, preferences) => dispatch(actions.updateProfile(firstName, lastName, preferences))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Settings);

