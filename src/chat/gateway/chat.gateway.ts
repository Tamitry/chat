import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { ChatService } from './../chat.service';

@WebSocketGateway({ cors: { origin: 'https://hoppscotch.io' } })
export class ChatGateway
  implements OnGatewayConnection {
  constructor(
    private chatService: ChatService
  ) { }

  async handleConnection(socket: Socket) {
    console.log(await this.chatService.getUserFromSocket(socket));
  }

  @WebSocketServer()
  server: Server;


  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() data: string,
    @ConnectedSocket() socket: Socket
  ) {
    const author = await this.chatService.getUserFromSocket(socket);
    const message = await this.chatService.saveMessage(data, author);

    this.server.emit('receive_message', message);
  }

  @SubscribeMessage('request_all_messages')
  async requestAllMessage(
    @ConnectedSocket() socket: Socket
  ) {
    await this.chatService.getUserFromSocket(socket);
    const messages = await this.chatService.getAllMessages();

    socket.emit('send_all_messages', messages);
  }

}
