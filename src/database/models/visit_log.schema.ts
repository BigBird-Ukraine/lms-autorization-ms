import { Document, Model, model, Schema, Types } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';

import { IVisitLog } from '../../interfaces';

export type Visit_logType = IVisitLog & Document;

export let Visit_logSchema: Schema;

Visit_logSchema = new Schema({
  group_id: {
    type: Types.ObjectId,
    ref: DatabaseTablesEnum.GROUP_COLLECTION_NAME
  },
  attendance: [{
    date: {
      type: Date
    },
    present_students_id: [{
      type: Types.ObjectId,
      ref: DatabaseTablesEnum.USER_COLLECTION_NAME
    }],
    absent_students_id: [{
      type: Types.ObjectId,
      ref: DatabaseTablesEnum.USER_COLLECTION_NAME
    }]
  }]
});

export const Visit_log: Model<Visit_logType> = model<Visit_logType>(
  DatabaseTablesEnum.VISIT_LOG_COLLECTION_NAME,
  Visit_logSchema,
  DatabaseTablesEnum.VISIT_LOG_COLLECTION_NAME
);
