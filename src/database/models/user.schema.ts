import { Document, Model, model, Schema, Types } from 'mongoose';

import { DatabaseTablesEnum, UserRoleEnum, UserStatusEnum } from '../../constants';
import { IUser } from '../../interfaces';

export type UserType = IUser & Document;

export let UserSchema: Schema;

UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone_number: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status_id: {
        type: Number,
        required: true,
        default: UserStatusEnum.ACTIVE
    },
    role_id: {
        type: Number,
        required: true,
        default: UserRoleEnum.STUDENT
    },
    photo_path: String,
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_at: {
        type: Date
    },
    groups_id: [{
        type: Types.ObjectId,
        ref: DatabaseTablesEnum.GROUP_COLLECTION_NAME
    }],
    passed_tests: [{
        lesson_id: {
            type: Types.ObjectId,
            ref: DatabaseTablesEnum.LESSON_COLLECTION_NAME
        },
        result: {
            type: Number
        },
        questions_id: [{
            type: Types.ObjectId,
            ref: DatabaseTablesEnum.QUESTION_COLLECTION_NAME
        }],
        created_at: {
            type: Date,
            default: Date.now(),
            required: true
        }
    }]
});

export const User: Model<UserType> = model<UserType>(
    DatabaseTablesEnum.USER_COLLECTION_NAME,
    UserSchema,
    DatabaseTablesEnum.USER_COLLECTION_NAME
);
