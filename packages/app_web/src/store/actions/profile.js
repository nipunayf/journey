import * as actionTypes from "./action-types";

export const updateName = (firstName, lastName) => {
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);

    return {
        type: actionTypes.UPDATE_NAME,
        firstName: firstName,
        lastName: lastName
    }
}

export const updateProfilePicture = (profilePic) => {
    localStorage.setItem('profilePic', profilePic);

    return {
        type: actionTypes.UPDATE_PROFILE_PICTURE,
        profilePic: profilePic
    }
}
