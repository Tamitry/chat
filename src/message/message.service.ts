import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Message from './message.entity';
import User from './../user/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>
  ) { }

  async saveMessage(content: string, author: User) {
    const newMessage = await this.messageRepository.create({ content, author });
    await this.messageRepository.save(newMessage);
    return newMessage;
  }

  async getAllMessages() {
    return this.messageRepository.find({
      relations: ['author']
    });
  }

}
