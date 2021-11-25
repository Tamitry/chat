import { Injectable } from '@nestjs/common';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { UserService } from './../user/user.service';
import User from './../user/user.entity';
import { MessageService } from './../message/message.service';

@Injectable()
export class ChatService {
  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }

  async getUserFromSocket(socket: Socket) {
    //const cookie = socket.handshake.headers.cookie;
    const userId = socket.handshake.headers.userid;

    // const { userId } = parse(cookie);
    const user = await this.userService.getUserById(parseInt(<string>userId));
    return user;
  }

  async saveMessage(content: string, author: User) {
    return this.messageService.saveMessage(content, author);
  }

  async getAllMessages() {
    return this.messageService.getAllMessages();
  }
}
