import { diskStorage } from "multer";

const { v4: uuidv4 } = require('uuid');
//import { v4 as uuidv4 } from 'uuid';

import * as fs from "fs";
import * as path from "path";

export const saveDocumentToStorage = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            const pathToImageFolder = path.join('src', 'documentsStorage', req.headers.ownerid as string);

            if (!fs.existsSync(pathToImageFolder)) {
                fs.mkdirSync(pathToImageFolder)
            }

            cb(null, pathToImageFolder);
        },
        filename: (req, file, cb) => {
            const fileExtension = path.extname(file.originalname);
            const fileName = uuidv4() + fileExtension;
            cb(null, fileName);
        }
    }),
    fileFilter: (req, file, cb) => {
        // try {
        //     let test = JSON.parse(file.buffer.toString());
        //     cb(null, true);
        // } catch (error) {
        //     cb(null, false);
        // }
        cb(null, true);
    }
}