/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
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
            let ownderid = req.headers.ownerid as string;
            let fullNameFile = req.headers.filename as string;
            let filePath = '';

            if (fullNameFile) {
                filePath = path.join('src', 'documentsStorage', ownderid, fullNameFile);
            }

            if (fs.existsSync(filePath) && fullNameFile) {
                cb(null, fullNameFile);
                return;
            }

            const fileExtension = path.extname(file.originalname);
            const fileName = uuidv4() + (fileExtension ? fileExtension : '.json');

            cb(null, fileName);
        }
    }),
    fileFilter: (req, file, cb) => {
        try {
            console.log("test:", file.buffer.toString());
            let test = JSON.parse(file.buffer.toString());
            cb(null, true);
        } catch (error) {
            cb(null, false);
        }
        cb(null, true);
    }
}