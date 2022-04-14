import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { resolve } from 'path';

import { SuperHeroModule } from './super-hero/super-hero.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://rudenkopavlo:vMOtyfH2LJaG9iVd@cluster0.xs96q.mongodb.net/super-hero?retryWrites=true&w=majority',
    ),
    SuperHeroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
