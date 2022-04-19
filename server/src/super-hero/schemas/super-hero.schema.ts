import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ImageName } from '../dto/create-super-hero.dto';

export type SuperHeroDocument = SuperHero & Document;

@Schema()
export class SuperHero {
  @Prop({
    required: true,
  })
  nickname: string;

  @Prop({
    required: true,
  })
  realName: string;

  @Prop()
  originDescription: string;

  @Prop({
    required: true,
  })
  superpowers: string;

  @Prop()
  catchPhrase: string;

  @Prop({
    required: true,
    maxlength: 5,
    max: 5,
  })
  imageNames: ImageName[];
}

export const CatSchema = SchemaFactory.createForClass(SuperHero);
