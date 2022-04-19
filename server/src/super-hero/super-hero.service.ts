import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import {
  CreateSuperHeroDto,
  ImageFile,
  ImageName,
} from './dto/create-super-hero.dto';
import { UpdateSuperHeroDto } from './dto/update-super-hero.dto';
import { ImageUploadService } from './image-upload/image-upload.service';
import { SuperHero, SuperHeroDocument } from './schemas/super-hero.schema';

@Injectable()
export class SuperHeroService {
  constructor(
    @InjectModel(SuperHero.name)
    private superHeroModel: Model<SuperHeroDocument>,
    private imageUploadService: ImageUploadService,
  ) {}

  create(
    createSuperHeroDto: CreateSuperHeroDto,
    imageDto: ImageFile[],
  ): Promise<SuperHeroDocument> {
    try {
      createSuperHeroDto.imageNames =
        this.imageUploadService.createImages(imageDto);
      const newSuperHero = new this.superHeroModel(createSuperHeroDto);
      return newSuperHero.save();
    } catch (e) {
      console.error(e);
    }
  }

  async findAll(offset = '0'): Promise<SuperHeroDocument[]> {
    const superHeros = await this.superHeroModel.find().skip(Number(offset));
    return superHeros;
  }

  async findOne(id: ObjectId): Promise<SuperHeroDocument> {
    const superHero = await this.superHeroModel.findById(id);
    return superHero;
  }

  async update(
    id: ObjectId,
    updateSuperHeroDto: UpdateSuperHeroDto,
    imageDto: ImageFile[],
  ) {
    const imageNames: ImageName[] = JSON.parse(
      updateSuperHeroDto.imageNames ?? '[]',
    );
    const newImageNames: ImageName[] = [];
    const oldImageNames: ImageName[] = [];

    for (const imageName of imageNames) {
      if (imageName.needDelete) {
        oldImageNames.push(imageName);
      } else {
        newImageNames.push(imageName);
      }
    }

    if (newImageNames.length + imageDto?.length > 5)
      throw new HttpException("Images can't be more then 5", 400);

    if (imageDto) {
      newImageNames.push(...this.imageUploadService.createImages(imageDto));
    }

    const updatedSuperHero = await this.superHeroModel.findByIdAndUpdate(
      id,
      {
        ...updateSuperHeroDto,
        imageNames: newImageNames,
      },
      {
        new: true,
      },
    );

    this.imageUploadService.removeImage(oldImageNames);

    return updatedSuperHero;
  }

  async remove(id: ObjectId, imageNames: ImageName[]): Promise<ObjectId> {
    const { _id } = await this.superHeroModel.findByIdAndDelete(id);
    this.imageUploadService.removeImage(imageNames);
    return _id;
  }
}
