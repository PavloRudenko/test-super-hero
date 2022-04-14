import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateSuperHeroDto, ImageDto } from './dto/create-super-hero.dto';
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
    imageDto: ImageDto,
  ): Promise<SuperHeroDocument> {
    const images = this.imageUploadService.createImages(imageDto);
    const newSuperHero = new this.superHeroModel({
      ...createSuperHeroDto,
      images,
    });
    return newSuperHero.save();
  }

  async findAll(count = '5', offset = '0'): Promise<SuperHeroDocument[]> {
    const superHeros = await this.superHeroModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return superHeros;
  }

  async findOne(id: ObjectId): Promise<SuperHeroDocument> {
    const superHero = await this.superHeroModel.findById(id);
    return superHero;
  }

  async update(
    id: ObjectId,
    updateSuperHeroDto: UpdateSuperHeroDto,
    imageDto: ImageDto,
  ) {
    if (imageDto) {
      updateSuperHeroDto.images =
        this.imageUploadService.createImages(imageDto);
    }

    const oldSuperHero = await this.superHeroModel.findByIdAndUpdate(id, {
      ...updateSuperHeroDto,
    });

    if (imageDto) {
      this.imageUploadService.removeImage(oldSuperHero.images);
    }

    return updateSuperHeroDto;
  }

  async remove(id: ObjectId): Promise<ObjectId> {
    const { _id } = await this.superHeroModel.findByIdAndDelete(id);
    return _id;
  }
}
