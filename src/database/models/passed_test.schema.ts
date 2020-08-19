import { Document, Model, model, Schema, Types } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { IPassedTest } from '../../interfaces';

export type PassedTestType = IPassedTest & Document;

export let PassedTestSchema: Schema;

PassedTestSchema = new Schema({
  lesson_label: {
    type: String
  },

  lesson_description: {
    type: String
  },

  questions: [{
    question: {
      type: String,
      required: true
    },
   description: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: false
    },
    subject: {
      type: String,
      required: true
    }
  }],
  result: {
    type: Number,
    required: false
  },
  user_id: {
    type: Types.ObjectId,
    ref: DatabaseTablesEnum.USER_COLLECTION_NAME
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

export const PassedTest: Model<PassedTestType> = model<PassedTestType>
(
  DatabaseTablesEnum.PASSED_TEST_COLLECTION_NAME,
  PassedTestSchema,
  DatabaseTablesEnum.PASSED_TEST_COLLECTION_NAME
);
