import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { writeFile, rm } from 'fs/promises';
import { v4 } from 'uuid';
import { ImageFile, ImageName } from '../dto/create-super-hero.dto';

@Injectable()
export class ImageUploadService {
  private filePath: string = resolve(__dirname, '..', '..', 'static');

  createImages(images: ImageFile[]): ImageName[] {
    try {
      const imageNames: ImageName[] = [];
      images.forEach((image) => {
        const fileExtension: string = image.originalname.split('.').pop();
        if (fileExtension.match(/jpe?g|png|svg/)) {
          const _id: string = v4() + '.' + fileExtension;
          writeFile(resolve(this.filePath, _id), image.buffer);
          imageNames.push({ _id, needDelete: false });
        }
      });

      return imageNames;
    } catch (err) {
      console.error(err);
    }
  }

  removeImage(images: ImageName[]): void {
    try {
      images.forEach(({ _id }) => {
        if (!_id.startsWith('default-superhero')) {
          rm(resolve(this.filePath, _id));
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
}
