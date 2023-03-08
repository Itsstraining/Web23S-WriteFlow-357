/* eslint-disable prettier/prettier */
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";

import * as fs from "fs";
import path from "path";

import { fromFile } from 'file-type'

type ValidFileExtension = 'png' | 'jpg' | 'jpeg' | 'webp';
type ValidFileMime = 'image/png' | 'image/jpg' | 'image/jpeg' | 'image/webp';

const validFileExtensions: ValidFileExtension[] = [
    'png',
    'jpg',
    'jpeg',
    'webp'
];
const validFileMimes: ValidFileMime[] = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/webp'
];

export const saveImageToStorage = {
    storage: diskStorage({
        destination: 'src/public/userImage',
        filename: (req, file, cb) => {
            const fileExtension = path.extname(file.originalname);
            const fileName = uuidv4() + fileExtension;
            cb(null, fileName);
        }
    }),
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
}

export const isFileValid = async (filePath: string): Promise<boolean> => {
    let isValid = false;
    await fromFile(filePath).then((fileTypeAndMime) => {
        if (fileTypeAndMime) {
            const isfileExtensionValid = validFileExtensions.includes(<ValidFileExtension>fileTypeAndMime.ext);
            const isfileMimeValid = validFileMimes.includes(<ValidFileMime>fileTypeAndMime.mime);

            isValid = isfileExtensionValid && isfileMimeValid;
        }
    })
    return isValid;
}


export const deleteFile = (filePath: string): void => {
    try {
        fs.unlinkSync(filePath);
    } catch (error) {
        console.log(error);
    }
}