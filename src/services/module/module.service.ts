import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { ModuleSchema, ModuleType } from '../../database';
import { IModule } from '../../interfaces';

class ModuleService {
  getModulesByParams(limit: number, offset: number, sort: string, order?: string, filter?: any): Promise<IModule[]> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME, ModuleSchema);

    return ModuleModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort({
        [sort]: order
      }) as any;
  }

  getModuleByID(module_id: string): Promise<IModule> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME, ModuleSchema);

    return ModuleModel
      .findOne({ _id: module_id })
      .populate('lesson_list')
      .select({ _id: 0 }) as any;
  }

  getSizeOfAll(filterParams: Partial<IModule>): Promise<any> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME, ModuleSchema);

    return ModuleModel
      .countDocuments(filterParams) as any;
  }
}

export const moduleService = new ModuleService();
