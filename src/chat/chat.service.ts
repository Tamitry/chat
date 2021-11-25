import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  constructor(
  ) { }

  async getUserFromSocket(socket: Socket) {

  }
}
