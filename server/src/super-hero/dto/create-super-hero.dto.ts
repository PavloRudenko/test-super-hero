export class CreateSuperHeroDto {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images: ImageFile[];
  imageNames: ImageName[];
}

export interface ImageName {
  readonly _id: string;
  needDelete: boolean;
}

export interface ImageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
