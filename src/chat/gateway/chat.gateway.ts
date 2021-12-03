import {
  ConnectedSocket
  , MessageBody
  , OnGatewayConnection
  , OnGatewayDisconnect, SubscribeMessage
  , WebSocketGateway
  , WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { ChatService } from './../chat.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private chatService: ChatService
  ) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() data: any,
    @ConnectedSocket() socket: Socket
  ) {
    const author = await this.chatService.getUserFromSocket(socket);
    const message = await this.chatService.saveMessage(data.message, author, data.roomId);

    this.server.emit('receive_message', { ...data, ...message });
  }

  @SubscribeMessage('request_top_messages')
  async requestTopMessages(
    @ConnectedSocket() socket: Socket
  ) {
    await this.chatService.getUserFromSocket(socket);
    //const messages = await this.chatService.getTopMessages();

    socket.emit('send_all_messages');
  }


  async handleConnection(socket: Socket) {
    const user = await this.chatService.getUserFromSocket(socket);
    this.server.emit('join', user);
  }

  async handleDisconnect(socket: Socket) {
    const user = await this.chatService.getUserFromSocket(socket);
    this.server.emit('leave', user);
  }
}
