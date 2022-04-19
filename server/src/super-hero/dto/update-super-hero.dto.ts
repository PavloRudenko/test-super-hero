import { OmitType } from '@nestjs/mapped-types';
import { CreateSuperHeroDto } from './create-super-hero.dto';

export class UpdateSuperHeroDto extends OmitType(CreateSuperHeroDto, [
  'imageNames',
]) {
  imageNames: string;
}
