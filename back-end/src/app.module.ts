import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { url } from './databaseUrl';
import { DocumentService } from './services/document/document.service';
import { UserDocument, DocumentSchema } from './schemas/document.schema';
import { DocumentController } from './controller/document/document.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot(url),
    MongooseModule.forFeature([{ name: UserDocument.name, schema: DocumentSchema }]),
  ],
  controllers: [AppController, DocumentController],
  providers: [AppService, DocumentService, AuthService],
})
export class AppModule { }
