/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { RoomService } from 'src/services/room/room.service';

@WebSocketGateway()
export class DocumentGateway {
  @WebSocketServer() server;
  constructor(private _roomService: RoomService) {
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(client: Socket, payload: any) {
  
    client.join(payload.roomId);
    let document=await this._roomService.addUser(payload.roomId, payload.user);
    // client.emit('update-room', document);
    this.server.to(payload.roomId).emit('update-room', document);
  }
  @SubscribeMessage('leave-room')
  async handleLeaveRoom(client: Socket, payload: any) { 
    client.leave(payload.roomId);  
    await this._roomService.removeUser(payload.roomId, payload.user);
    this.server.to(payload.roomId).emit('update-room', await this._roomService.get(payload.roomId));

  }

  @SubscribeMessage('send-data')
  handleSendData(client: Socket, payload: any) {
    client.broadcast.to(payload.roomId).emit('receive-data', payload.data);
  }
}
