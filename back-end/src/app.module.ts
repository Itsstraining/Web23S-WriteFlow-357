/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { url } from './databaseUrl';

//services
import { AuthService } from './services/auth/auth.service';
import { DocumentService } from './services/document/document.service';
import { UserService } from './services/user/user.service';

//schemas
import { Doc, DocumentSchema } from './schemas/document.schema';
import { User, UserSchema } from './schemas/user.schema';


//controllers
import { DocumentController } from './controller/document/document.controller';
import { UserController } from './controller/user/user.controller';
import { AutoSaveGateway } from './sockets/auto-save/auto-save.gateway';
import { DocumentGateway } from './sockets/document/document.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(url),
    MongooseModule.forFeature([
      { name: Doc.name, schema: DocumentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AppController, DocumentController, UserController,],
  providers: [AppService, DocumentService, AuthService, UserService, AutoSaveGateway, DocumentGateway,],
})
export class AppModule { }
