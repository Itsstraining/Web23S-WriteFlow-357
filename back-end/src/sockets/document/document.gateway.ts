/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class DocumentGateway {
  @WebSocketServer() server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, payload: any) {
    client.join(payload.roomId);
  }

  @SubscribeMessage('send-data')
  handleSendData(client: Socket, payload: any) {
    client.broadcast.to(payload.roomId).emit('receive-data', payload.data);
  }
}
