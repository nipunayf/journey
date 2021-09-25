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
import {addItemToArray} from "../../utils/state-array";

function AddMembersModal({parentFormik, setScreen, displayName, profilePic, email}) {
    const toast = useToast();
    const [members, setMembers] = useState([]);

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: async values => {
            const user = await getUserByEmail(values.email);

            //Check if the member is the owner
            if (values.email === email) {
                generateErrorMessage(toast, 'Unable to send the invitation', 'You cannot send an invitation to yourself!')
                return
            }

            //Check if the member is already added
            if (members.filter(e => e.email === values.email).length > 0) {
                generateErrorMessage(toast, 'Unable to send the invitation', 'Invitation already sent to the user')
                return
            }

            //Check if there is a user for the given email
            if (user.data) {
                addItemToArray({
                    email: user.data.email,
                    displayName: `${user.data.firstName} ${user.data.lastName}`,
                    profilePic: user.data.profilePic
                }, members, setMembers);
                generateSuccessMessage(toast, 'Invite sent successfully', `Itinerary invitation is sent to ${user.data.firstName} ${user.data.lastName}` )
            } else {
                generateErrorMessage(toast, 'Unable to send the invitation', user.message)
            }
        }
    });

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
                <Member email={email} name={displayName} profilePic={profilePic} isOwner={true}/>
                {members.length > 0 && members.map(member => <Member email={member.email} name={member.displayName} profilePic={member.profilePic}/>)}
            </VStack>
        </ModalBody>
        <ModalFooter>
            <Button
                bg={'secondary.light'}
                color={'white'}
                onClick={() => {
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
                    setScreen(1)
                }}
                _hover={{bg: 'green.500'}}>
                Next
            </Button>
        </ModalFooter>
    </>);
}


const mapStateToProps = state => {
    return {
        displayName: `${state.profile.firstName} ${state.profile.lastName}`,
        email: state.auth.email,
        profilePic: state.profile.profilePic,
    };
};

export default connect(mapStateToProps, null)(AddMembersModal);
