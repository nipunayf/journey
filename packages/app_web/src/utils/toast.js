/**
 * Duration of the toast in milliseconds
 * @type {number}
 */
const DURATION = 7000;

/**
 * Generate a success message toast.
 * @param toast - variable made using useToast
 * @param title - title of the success message
 * @param message - description of the message
 */
export const generateSuccessMessage = (toast, title, message) => {
    toast({
        position: "bottom-left",
        title: title,
        description: message,
        status: "success",
        isClosable: true,
        duration: DURATION
    });
}

/**
 * Generate an error toast.
 * @param toast - variable made using useToast
 * @param title - title of the success message
 * @param message - description of the message
 */
export const generateErrorMessage = (toast, title, message) => {
    toast({
        position: "bottom-left",
        title: title,
        description: message,
        status: "error",
        isClosable: true,
        duration: DURATION
    });
}
