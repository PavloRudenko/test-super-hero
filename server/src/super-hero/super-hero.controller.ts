import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { SuperHeroService } from './super-hero.service';
import { CreateSuperHeroDto } from './dto/create-super-hero.dto';
import { UpdateSuperHeroDto } from './dto/update-super-hero.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('super-hero')
export class SuperHeroController {
  constructor(private readonly superHeroService: SuperHeroService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  create(
    @Body() createSuperHeroDto: CreateSuperHeroDto,
    @UploadedFiles() { images: imageDto }: Pick<CreateSuperHeroDto, 'images'>,
  ) {
    return this.superHeroService.create(createSuperHeroDto, imageDto);
  }

  @Get()
  findAll(@Query('offset') offset: string) {
    return this.superHeroService.findAll(offset);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.superHeroService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  update(
    @Param('id') id: ObjectId,
    @Body() updateSuperHeroDto: UpdateSuperHeroDto,
    @UploadedFiles() { images: imageDto }: Pick<UpdateSuperHeroDto, 'images'>,
  ) {
    return this.superHeroService.update(id, updateSuperHeroDto, imageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId, @Query('imageNames') imageNames: string) {
    return this.superHeroService.remove(id, JSON.parse(imageNames));
  }
}
