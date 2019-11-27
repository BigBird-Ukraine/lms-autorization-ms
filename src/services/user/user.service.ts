import { WhereOptions } from 'sequelize';

import { IUserModel, UserDBModel } from '../../database';

const attributes: Array<keyof IUserModel> = [
    'id',
    'email',
    'name',
    'surname',
    'password',
    'role_id',
    'status_id',
    'photo_path',
    'created_at',
    'updated_at'
];

class UserService {

     getAllUsers() {
        return UserDBModel.findAll();
    }

    async getUserByParams(findUser: WhereOptions): Promise<Partial<IUserModel>> {
         const user = await UserDBModel.findOne({
             where: findUser,
             attributes
         }) as any;

         return user && user.dataValues;
    }

    createNewUser(creatingUser: IUserModel) {
         return UserDBModel.create(creatingUser);
    }
}

export const userService = new UserService();
