import { NestFactory } from '@nestjs/core';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

import { AppModule } from './app.module';
import { PORT, BASE_URL } from './config';

const filePath: string = resolve(__dirname, 'static');
if (!existsSync(filePath)) {
  mkdirSync(filePath, { recursive: true });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(PORT, () => {
    console.log(`Server has been started on ${BASE_URL}:${PORT}`);
  });
}
bootstrap();
