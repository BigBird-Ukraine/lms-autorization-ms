import { Document, Model, model, Schema } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { IQuestion } from '../../interfaces';

export type QuestionType = IQuestion & Document;

export let QuestionSchema: Schema;
QuestionSchema = new Schema({
    question: String,
    description: String,
    user_id: String,
    answers: [{
        value: String,
        correct: Boolean
    }],
    level: String,
    subject: String,
    group: [String],
    tags: [String]
});

export const Question: Model<QuestionType> = model<QuestionType>(
    DatabaseTablesEnum.QUESTION_COLLECTION_NAME,
    QuestionSchema,
    DatabaseTablesEnum.QUESTION_COLLECTION_NAME
);
