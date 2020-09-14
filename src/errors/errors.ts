import { config } from '../configs';
import { StatusesEnum } from '../constants';

export const errors = {
    // 400
    BAD_REQUEST_WRONG_PARAMS: {
        message: StatusesEnum.BAD_REQUEST_WRONG_PARAMS,
        code: 4000
    },

    BAD_REQUEST_USER_ALREADY_EXIST: { // Error when user want register. But this user is already exists
        message: StatusesEnum.USER_ALREADY_EXIST,
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
        message: StatusesEnum.CANT_UPLOAD_MORE_THAN_ONE_USER_PHOTO
    },

    BAD_REQUEST_WRONG_SORTING_PARAMS: {
        code: 4005,
        message: StatusesEnum.CANT_SORT_BY_THIS_PARAM
    },

    BAD_REQUEST_QUESTION_ALREADY_EXIST_IN_LESSON: {
        code: 4006,
        message: StatusesEnum.QUESTION_ALREADY_EXIST
    },

    BAD_REQUEST_LIMIT_QUESTION: {
        code: 4007,
        message: `Lesson can contain only ${config.MAX_QUESTION_LIMIT} questions`
    },

    BAD_REQUEST_ROOM_ALREADY_EXIST: {
        code: 4008,
        message: StatusesEnum.ROOM_ALREADY_EXIST
    },

    // 401
    UNAUTHORIZED_WRONG_CREDENTIALS: {
        code: 4011,
        message: StatusesEnum.WRONG_EMAIL_OR_PASSWORD
    },
    // 403
    FORBIDDEN_USER_BLOCKED: {
        message: StatusesEnum.USER_IS_BLOCKED,
        code: 4031
    },

    FORBIDDEN_NO_PERMISSIONS: {
        message: StatusesEnum.NO_PERMISSIONS_TO_ACTION,
        code: 4032
    },

    FORBIDDEN_NOT_YOUR_QUESTION: {
        message: StatusesEnum.NOT_YOUR_QUESTION,
        code: 4033
    },

    FORBIDDEN_NOT_YOUR_LESSON: {
        message: StatusesEnum.NOT_YOUR_LESSON,
        code: 4034
    },
    FORBIDDEN_NOT_YOUR_COMMENT: {
        message: StatusesEnum.NOT_YOUR_COMMENT,
        code: 4034
    },

    FORBIDDEN_USER_PENDING: {
        message: StatusesEnum.USER_IS_PENDING,
        code: 4035
    },

    FORBIDDEN_NOT_YOUR_ROOM: {
        message: StatusesEnum.NOT_YOUR_ROOM,
        code: 4036
    },

    FORBIDDEN_ROOM_HAS_USERS: {
        message: StatusesEnum.ROOM_HAS_USERS,
        code: 4036
    },

    // 404
    NOT_FOUND_USER_NOT_PRESENT: { // When user wants login, but email not found in DB
        message: StatusesEnum.USER_NOT_FOUND,
        code: 4041
    },

    NOT_FOUND_QUESTION_NOT_PRESENT: {
        message: StatusesEnum.QUESTION_NOT_FOUND,
        code: 4042
    },

    NOT_FOUND_LESSON_NOT_PRESENT: {
        message: StatusesEnum.LESSON_NOT_FOUND,
        code: 4043
    },

    NOT_FOUND_COMMENT_NOT_PRESENT: {
        message: StatusesEnum.LESSON_NOT_FOUND,
        code: 4043
    },

    NOT_FOUND_COURSE_NOT_PRESENT: {
        message: StatusesEnum.COURSE_NOT_FOUND,
        code: 4044
    },

    NOT_FOUND_MODULE_PRESENT: { // When user wants get module witch not found in DB
        message: StatusesEnum.MODULE_NOT_FOUND,
        code: 4045
    },

    NOT_FOUND_GROUP_NOT_PRESENT: {
        message: StatusesEnum.GROUP_NOT_FOUND,
        code: 4046
    },

    NOT_FOUND_VISIT_LOG_NOT_PRESENT:  {
        message: StatusesEnum.VISIT_LOG_NOT_FOUND,
        code: 4047
    },

    NOT_FOUND_ROOM_NOT_PRESENT: {
        message: StatusesEnum.ROOM_NOT_FOUND,
        code: 4048
    }
};
