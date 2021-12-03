import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Message from './message.entity';
import User from './../user/user.entity';
import { RoomsService } from './../rooms/rooms.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private roomService: RoomsService
  ) { }

  async saveMessage(content: string, author: User, roomId: number) {
    const newMessage = await this.messageRepository.create({ content, author });
    newMessage.room = await this.roomService.findOne(roomId);
    await this.messageRepository.save(newMessage);
    return newMessage;
  }

  async getAllMessagesRoom() {
    return this.messageRepository.find({
      relations: ['author']
    });
  }

  async getMessageTop(roomId: number, limit: number) {
    return this.messageRepository.find({
      where: { room: roomId },
      take: limit
    });
  }
}
