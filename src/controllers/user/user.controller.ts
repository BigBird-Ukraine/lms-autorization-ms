import {NextFunction, Response} from 'express';
import {UploadedFile} from 'express-fileupload';
import {ResponseStatusCodesEnum} from '../../constants';
import {HASH_PASSWORD, updatedUserPhotoMv, userPhotoMv} from '../../helpers';
import {IRequestExtended, ITestResultModel, IUser, IUserSubjectModel} from '../../interfaces';
import {userService} from '../../services';

class UserController {

    async createUser(req: IRequestExtended, res: Response, next: NextFunction) {

        const user = req.body as IUser;
        const appRoot = (global as any).appRoot;
        const [userPhoto] = req.photos as UploadedFile[];

        user.password = await HASH_PASSWORD(user.password);
        const registeredUser = await userService.createUser(user);

        if (userPhoto) {
            const {photoDir, photoName, _id} = await userPhotoMv(registeredUser, userPhoto, appRoot);
            await userService.updateUser(_id, {photo_path: `${photoDir}/${photoName}`});
        }

        res.status(ResponseStatusCodesEnum.CREATED).end();
    }

    getUserInfoByToken(req: IRequestExtended, res: Response, next: NextFunction) {

        const {_id, email, phone_number, name, surname, role_id, status_id, photo_path, groups_id} = req.user as IUser;

        const user: IUserSubjectModel = {
            _id,
            email,
            phone_number,
            name,
            surname,
            role_id,
            status_id,
            photo_path,
            groups_id
        };

        res.json(user);
    }

    async updateUserByID(req: IRequestExtended, res: Response, next: NextFunction) {
        const {user_id} = req.params;
        let updateInfo = req.body as IUser;

        const appRoot = (global as any).appRoot;
        const [userPhoto] = req.photos as UploadedFile[];

        if (userPhoto) {
            updateInfo = await updatedUserPhotoMv(user_id, userPhoto, updateInfo, appRoot);
        }

        await userService.updateUser(user_id, updateInfo);

        const user = await userService.getUserByID(user_id);

        res.json({data: user});
    }

    async addTestResult(req: IRequestExtended, res: Response, next: NextFunction) {

        const {_id} = req.user as IUser;
        const passed_test = req.passed_test as ITestResultModel;

        await userService.addPassedTest(_id, passed_test);

        const user = await userService.getUserByID(_id);

        res.json({data: user});
    }
}

export const userController = new UserController();
