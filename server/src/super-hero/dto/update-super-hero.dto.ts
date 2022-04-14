import { PartialType } from '@nestjs/mapped-types';
import { CreateSuperHeroDto } from './create-super-hero.dto';

export class UpdateSuperHeroDto extends PartialType(CreateSuperHeroDto) {}
