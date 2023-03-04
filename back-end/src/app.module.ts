import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { url } from './databaseUrl';
import { DocumentService } from './services/document/document.service';
import { Document, DocumentSchema } from './schemas/document.schema';
import { DocumentController } from './controller/document/document.controller';

@Module({
  imports: [
    MongooseModule.forRoot(url),
    MongooseModule.forFeature([{ name: Document.name, schema: DocumentSchema }]),
  ],
  controllers: [AppController, DocumentController],
  providers: [AppService, DocumentService],
})
export class AppModule { }
