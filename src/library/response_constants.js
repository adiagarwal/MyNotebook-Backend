let failResponse = {
    USER_EXISTS : 'User with this email already exists!',
    USER_NOT_EXISTS : "User Not Found!",
    TOKEN_INVALID : "Please authenticate using a valid token!",
    INVALID_USER : "Invalid User!",
    NOT_FOUND : 'Not Found!'
}

let successResponse = {
    SUCCESS_CREATE: "Successfully created!",
    SUCCESS_UPDATE: "Successfully updated!",
    SUCCESS_DELETE: "Successfully deleted!"
}



module.exports = {failResponse,successResponse}