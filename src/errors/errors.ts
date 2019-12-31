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

    BAD_REQUEST_WRONG_SORTING_PARAMS: {
        code: 4005,
        message: 'You can\'t sort by this parameter'
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

    FORBIDDEN_NO_PERMISSIONS: {
        message: 'You have no permissions to this action',
        code: 4032
    },

    FORBIDDEN_NOT_YOUR_QUESTION: {
        message: 'Its not your question',
        code: 4033
    },

    FORBIDDEN_NOT_YOUR_LESSON: {
      message: 'Its not your lesson',
      code: 4034
    },

    // 404
    NOT_FOUND_USER_NOT_PRESENT: { // When user wants login, but email not found in DB
        message: 'User is not found',
        code: 4041
    },

    NOT_FOUND_QUESTION_NOT_PRESENT: {
        message: 'Question not found',
        code: 4042
    },

    NOT_FOUND_LESSON_NOT_PRESENT: {
        message: 'Lesson not found',
        code: 4043
    }
};
