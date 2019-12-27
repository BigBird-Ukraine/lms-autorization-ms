import { config } from '../configs';

export const errors = {
    // 400
    BAD_REQUEST_USER_ALREADY_EXIST: { // Error when user want register. But this user is already exists
        message: 'User already exist',
        code: 4001
    },

    BAD_REQUEST_MAX_PHOTO_SIZE: {
      code: 4002,
      message: `Max photo size is ${config.MAX_PHOTO_SIZE / (1024 * 1024)}mb`
    },

    BAD_REQUEST_INVALID_FILE_MIMETYPE: {
      code: 4003
    },

    BAD_REQUEST_MAX_PHOTO_AMOUNT: {
      code: 4004,
      message: `You can't upload more than one userPhotos`
    },
    // 401
    UNAUTHORIZED_WRONG_CREDENTIALS: {
        code: 4011,
        message: 'Wrong email or password'
    },
    // 403
    FORBIDDEN_USER_BLOCKED: { // When user try to do something with blocked account
        message: 'User is blocked',
        code: 4031
    },

    // 404
    NOT_FOUND_USER_NOT_PRESENT: { // When user wants login, but email not found in DB
        message: 'User is not found',
        code: 4041
    }
};
