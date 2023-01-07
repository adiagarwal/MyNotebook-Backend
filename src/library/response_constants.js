let failResponse = {
    USER_EXISTS : {msg : 'User with this email already exists!'},
    USER_NOT_EXISTS : {msg : "User Not Found!"},
    TOKEN_INVALID : {msg : "Please authenticate using a valid token!"},
    INVALID_USER : {msg : "Invalid User!"},
    NOT_FOUND : {msg : 'Not Found!'}
}

let successResponse = {
    SUCCESS_CREATE: {msg : "Successfully created!"},
    SUCCESS_UPDATE: {msg : "Successfully updated!"},
    SUCCESS_DELETE: {msg : "Successfully deleted!"}
}



module.exports = {failResponse,successResponse}