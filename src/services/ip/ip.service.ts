import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { IPScheme, IPType } from '../../database/models';

class IpService {
  getApis(): Promise<any> {
    const ApiModel = model<IPType>(DatabaseTablesEnum.IP_COLLECTION_NAME, IPScheme);

    return ApiModel.find() as any;
  }
}

export const apiService = new IpService();
