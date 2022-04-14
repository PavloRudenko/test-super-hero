import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop()
  images: string[];
}

export const CatSchema = SchemaFactory.createForClass(SuperHero);
