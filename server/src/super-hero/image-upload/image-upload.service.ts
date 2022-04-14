import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { writeFile, rm } from 'fs/promises';
import { v4 } from 'uuid';
import { ImageDto } from '../dto/create-super-hero.dto';

@Injectable()
export class ImageUploadService {
  filePath: string = resolve(__dirname, '..', '..', 'static');

  createImages(images: ImageDto): string[] {
    try {
      const imageNames = [];
      images.forEach((image) => {
        const fileExtension: string = image.originalname.split('.').pop();
        if (fileExtension.match(/jpe?g|png|svg/)) {
          const imageName: string = v4() + '.' + fileExtension;
          writeFile(resolve(this.filePath, imageName), image.buffer);
          imageNames.push(imageName);
        }
      });

      return imageNames;
    } catch (err) {
      console.error(err);
    }
  }

  removeImage(images: string[]): void {
    try {
      images.forEach((image) => {
        rm(resolve(this.filePath, image));
      });
    } catch (err) {
      console.error(err);
    }
  }
}
