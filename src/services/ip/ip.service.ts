import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { IPScheme, IPType } from '../../database/models';
import { IIp } from '../../interfaces';

class IpService {
  getIps(): Promise<IIp> {
    const IpModel = model<IPType>(DatabaseTablesEnum.IP_COLLECTION_NAME, IPScheme);

    return IpModel.find() as any;
  }
}

export const ipService = new IpService();
