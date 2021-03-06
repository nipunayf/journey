import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    Heading,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    ModalHeader,
    useToast,
    VStack
} from "@chakra-ui/react";
import InputBox from "../../components/Form/InputBox";
import Member from "../../components/Member/Member";
import {connect} from "react-redux";
import {EmailIcon} from "@chakra-ui/icons";
import {getUserByEmail} from "../../api";
import {generateErrorMessage, generateSuccessMessage} from "../../utils/toast";
import {useState} from 'react';
import {addItemToArray, removeItemFromArray} from "../../utils/state-array";

function AddMembersModal({parentFormik, setScreen, displayName, profilePic, authEmail}) {
    const toast = useToast();
    const [members, setMembers] = useState(parentFormik.values.members);

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),

        onSubmit: async values => {
            formik.setSubmitting(true);

            //Check if the member is the owner
            if (formik.values.email === authEmail) {
                generateErrorMessage(toast, 'Unable to send the invitation', 'You cannot send an invitation to yourself!')
            }

            //Check if the member is already added
            else if (members.filter(e => e.email === formik.values.email).length > 0) {
                generateErrorMessage(toast, 'Unable to send the invitation', 'Invitation already sent to the user')
            }

            //Check if there is a user for the given email
            else {
                const user = await getUserByEmail(formik.values.email);
                if (user.data) {
                    addItemToArray({
                        email: user.data.email,
                        displayName: `${user.data.firstName} ${user.data.lastName}`,
                        profilePic: user.data.profilePic,
                        userID: user.data.userID,
                        preferences: user.data.preferences
                    }, members, setMembers);
                    formik.values.email = '';
                    generateSuccessMessage(toast, 'Invite sent successfully', `Itinerary invitation is sent to ${user.data.firstName} ${user.data.lastName}`)
                } else {
                    generateErrorMessage(toast, 'Unable to send the invitation', user.message)
                }
            }
            formik.setSubmitting(false);
        }
    });

    const removeMember = email => () => {
        const memberIndex = members.findIndex((stateMember) => {
            return stateMember.email === email;
        });
        removeItemFromArray(memberIndex, members, setMembers);
        generateSuccessMessage(toast,'Invitation cancelled successfully', `Itinerary invitation cancelled that is sent to ${email}`)
    }

    return (<>
        <ModalHeader>Invite Your Friends</ModalHeader>
        <ModalCloseButton/>
        <ModalBody alignItems={'center'}>
            <InputBox id="email" name={"Enter the email address of the member:"} formik={formik}/>
            <Button
                bg={'secondary.light'}
                color={'white'}
                leftIcon={<EmailIcon />}
                size={'sm'}
                onClick={formik.handleSubmit}
                isDisabled={!formik.isValid}
                isLoading={formik.isSubmitting}
                my={4}
                _hover={{bg: 'blue.500'}}>
                Invite
            </Button>
            <Heading size={'sm'} pb={2}>Members:</Heading>
            <VStack w={"80%"} spacing={4} align={'left'} overflowY={'auto'} maxH={180}>
                <Member email={authEmail} name={displayName} profilePic={profilePic} isOwner={true}/>
                {members.length > 0 && members.map(member => <Member email={member.email} name={member.displayName} profilePic={member.profilePic} onRemove={removeMember(member.email)}/>)}
            </VStack>
        </ModalBody>
        <ModalFooter>
            <Button
                bg={'secondary.light'}
                color={'white'}
                onClick={() => {
                    parentFormik.setFieldValue('members', members);;
                    setScreen(0)
                }}
                mr={3}
                _hover={{bg: 'blue.500'}}>
                Previous
            </Button>
            <Button
                bg={'green.400'}
                color={'white'}
                onClick={() => {
                    parentFormik.setFieldValue('members', members);;
                    setScreen(1);
                }}
                isDisabled={members.length === 0}
                _hover={{bg: 'green.500'}}>
                Next
            </Button>
        </ModalFooter>
    </>);
}


const mapStateToProps = state => {
    return {
        displayName: `${state.profile.firstName} ${state.profile.lastName}`,
        authEmail: state.auth.email,
        profilePic: state.profile.profilePic,
    };
};

export default connect(mapStateToProps, null)(AddMembersModal);
