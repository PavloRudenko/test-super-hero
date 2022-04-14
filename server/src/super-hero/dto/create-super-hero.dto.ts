export class CreateSuperHeroDto {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images: ImageDto;
}

export interface ImageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export type ImageDto = ImageFile[] | string[];
