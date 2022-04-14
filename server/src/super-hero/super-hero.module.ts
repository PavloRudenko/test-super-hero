import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SuperHeroService } from './super-hero.service';
import { SuperHeroController } from './super-hero.controller';
import { SuperHero, CatSchema } from './schemas/super-hero.schema';
import { ImageUploadService } from './image-upload/image-upload.service';

@Module({
  controllers: [SuperHeroController],
  providers: [SuperHeroService, ImageUploadService],
  imports: [
    MongooseModule.forFeature([{ name: SuperHero.name, schema: CatSchema }]),
  ],
})
export class SuperHeroModule {}
