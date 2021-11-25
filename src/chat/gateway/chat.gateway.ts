import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway({ cors: { origin: 'https://hoppscotch.io' } })
export class ChatGateway
// implements OnGatewayConnection
{

  @WebSocketServer()
  server: Server;


  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() data: string) {
    this.server.emit('receive_message', data);
  }

}
