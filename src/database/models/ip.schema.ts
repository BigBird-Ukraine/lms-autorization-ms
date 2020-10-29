import { Document, model, Model, Schema } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { IIp } from '../../interfaces';

export type IPType = IIp & Document;

export let IPScheme: Schema;

IPScheme = new Schema({
  title: {
    type: String
  },
  address: {
    type: String
  },
  ip: {
    type: String
  }
});

export const Ip: Model<IPType> = model<IPType>
(
  DatabaseTablesEnum.IP_COLLECTION_NAME,
  IPScheme,
  DatabaseTablesEnum.IP_COLLECTION_NAME
);
