/* eslint-disable prettier/prettier */
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { DocumentService } from 'src/services/document/document.service';

@WebSocketGateway({cors:true})
export class AutoSaveGateway {
  @WebSocketServer() server;

  constructor(private documentService: DocumentService) { 
    
  }

  @SubscribeMessage('save')
  handleMessage(client: any, payload: any) {
    this.documentService.updateDocument(payload.id, payload.uid, payload);
    return 'Updated';
  }
}
