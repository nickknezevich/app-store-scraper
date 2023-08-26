// file.service.ts
import { Injectable, Res, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

import { v4 as uuidV4 } from 'uuid';
import sharp = require('sharp');

const UPLOAD_PATH = 'uploads'
import { createReadStream } from 'fs';

@Injectable()
export class FileService {
    async transformAndSave(image: string): Promise<string> {
        const base64Image = image.split(';base64,').pop(); // Remove data URL part
        const decodedImage = Buffer.from(base64Image, 'base64');
        const fileUuid =  uuidV4();
        const filename = fileUuid + '.jpg';

        try {
            await sharp(decodedImage.buffer)
                .resize(800)
                .webp({ effort: 3 })
                .toFile(path.join(UPLOAD_PATH, filename));
        } catch (e) {
            console.error(e)
        }
        return fileUuid;
    }

    async serveImage(filename: string): Promise<any> {
        try {
            const imagePath = path.join(UPLOAD_PATH, filename+'.jpg');
            const imageStream = createReadStream(imagePath);
            return imageStream;
        } catch (e) {
            console.log(e)
        }
    }
}
