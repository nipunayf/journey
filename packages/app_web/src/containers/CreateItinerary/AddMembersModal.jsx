import {useFormik} from "formik";
import * as Yup from "yup";
import {Box, Button, Heading, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, VStack} from "@chakra-ui/react";
import InputBox from "../../components/Form/InputBox";
import Member from "../../components/Member/Member";
import {connect} from "react-redux";

function AddMembersModal({parentFormik, setScreen, displayName, profilePic}) {
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            parentFormik.setFieldValue('email', formik.values.email);
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
                size={'sm'}
                onClick={() => {
                }}
                my={4}
                _hover={{bg: 'blue.500'}}>
                Add
            </Button>
            <Heading size={'sm'} pb={2}>Members:</Heading>
            <VStack w={"80%"} spacing={4} align={'left'} overflowY={'scroll'} maxH={180}>
                <Member email={'test@test.com'} name={displayName} profilePic={profilePic} isOwner={true}/>
                <Member email={'test@test.com'} name={displayName} profilePic={profilePic}/>
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
                    formik.handleSubmit()
                }}
                _hover={{bg: 'blue.500'}}>
                Next
            </Button>
        </ModalFooter>
    </>);
}


const mapStateToProps = state => {
    return {
        displayName: state.displayName,
        profilePic: state.profilePic
    };
};

export default connect(mapStateToProps, null)(AddMembersModal);
