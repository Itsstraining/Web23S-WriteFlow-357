/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DocumentService } from './services/document/document.service';
const { v4: uuidv4 } = require('uuid');
//import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private documentService: DocumentService) { }

  @Get()
  getHello(): string {
    return "Working";
  }

  // @Post()
  // postHello(): any {
  //   return this.documentService.create({
  //     id: uuidv4(),
  //     contentPath: "./documentsStorage/Nguoi_dung_1/7b4b6ae6-ba57-11ed-afa1-0242ac120002.json",
  //     dateCreated: Date.now().toLocaleString(),
  //     dateModified: Date.now().toLocaleString(),
  //     status: "1",
  //     isDelete: false,
  //     ownerId: "Nguoi_dung_1",
  //   })
  // }
}
