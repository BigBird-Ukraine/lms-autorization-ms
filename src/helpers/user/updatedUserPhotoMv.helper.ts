import { UploadedFile } from 'express-fileupload';
import * as fs from 'fs-extra';
import { resolve as resolvePath } from 'path';
import * as uuid from 'uuid';
import { IUser } from '../../interfaces';

export const updatedUserPhotoMv = async (user_id: string, userPhoto: UploadedFile, updateInfo: IUser, appRoot: any) => {

    const photoDir = `user/${user_id}/photo`;

    const photoExtension = userPhoto.name.split('.').pop();
    const photoName = `${uuid.v1()}.${photoExtension}`;
    const oldPhotos = fs.readdirSync(resolvePath(`${appRoot}/static/${photoDir}`));

    if (oldPhotos) {

        for (const photo of oldPhotos) {
            fs.unlinkSync(resolvePath(`${appRoot}/static/${photoDir}/${photo}`));
        }
    }

    fs.mkdirSync(resolvePath(`${appRoot}/static/${photoDir}`), {recursive: true});

    await userPhoto.mv(resolvePath(`${appRoot}/static/${photoDir}/${photoName}`));
    updateInfo.photo_path = `${photoDir}/${photoName}`;

    return updateInfo;
};
