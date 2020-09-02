import { Storage } from '@google-cloud/storage';
import { NextFunction, Response } from 'express';
import * as path from 'path';
import { format } from 'util';

import { IRequestExtended } from '../../interfaces';

export const googleVideoUploader = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const serviceKey = path.join(process.cwd(), 'google_keys.json');

  const gc = new Storage({
    keyFilename: serviceKey,
    projectId: 'bigbirdvideos'
  });

  const bucket = gc.bucket('big-bird-videos');

  await new Promise((reject, resolve) => {
      const { files } = req.files;

      const blob = bucket.file(files.name.replace(/ /g, '_'));
      const blobStream = blob.createWriteStream({
        resumable: false
      });
      blobStream.on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
        .on('error', () => {
          reject(`Unable to upload image, something went wrong`);
        })
        .end(files.data);
    }).catch(err => console.log(err))
  ;

  next();
};
