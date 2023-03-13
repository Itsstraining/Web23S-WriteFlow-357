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
import { MailService } from './services/mail/mail.service';

//schemas
import { Doc, DocumentSchema } from './schemas/document.schema';
import { User, UserSchema } from './schemas/user.schema';
import { Mail, MailSchema } from './schemas/mail.schema';

//controllers
import { DocumentController } from './controller/document/document.controller';
import { UserController } from './controller/user/user.controller';
import { AutoSaveGateway } from './sockets/auto-save/auto-save.gateway';
import { DocumentGateway } from './sockets/document/document.gateway';
import { MailController } from './controller/mail/mail.controller';
import { RoomService } from './services/room/room.service';
import { RoomController } from './controller/room/room/room.controller';
import { Room, RoomSchema } from './schemas/room.schema';



@Module({
  imports: [
    MongooseModule.forRoot(url),
    MongooseModule.forFeature([
      { name: Doc.name, schema: DocumentSchema },
      { name: User.name, schema: UserSchema },
      { name: Mail.name, schema: MailSchema},
      { name: Room.name, schema: RoomSchema}
    ]),
  ],
  controllers: [AppController, DocumentController, UserController, MailController, RoomController,],
  providers: [AppService, DocumentService, AuthService, UserService, AutoSaveGateway, DocumentGateway, MailService, RoomService,],
})
export class AppModule { }
