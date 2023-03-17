/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-var */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as admin from 'firebase-admin';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
var serviceAccount = require("../serviceAccountKey.json");

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.useStaticAssets(join('src', 'public'), {
    index: false,
    prefix: '/static/',
  });

  await app.listen(3000);
}
bootstrap();
