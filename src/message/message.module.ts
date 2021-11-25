import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import Message from './message.entity';
import User from './../user/user.entity';

@Module({
  providers: [MessageService],
  imports: [
    TypeOrmModule.forFeature([Message, User])
  ]
})
export class MessageModule { }
