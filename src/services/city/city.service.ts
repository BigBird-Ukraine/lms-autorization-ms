import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { CityScheme, CityType } from '../../database/models';
import { ICityModel } from '../../interfaces';

class CityService {

  getCities(): Promise<ICityModel[]> {
    const CityModel = model<CityType>(DatabaseTablesEnum.CITY_COLLECTION_NAME, CityScheme);

    return CityModel.find() as any;
  }

}

export const cityService = new CityService();
