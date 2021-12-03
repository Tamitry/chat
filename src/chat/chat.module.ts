import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './../user/user.entity';
import { UserModule } from './../user/user.module';
import { MessageModule } from './../message/message.module';
import Message from './../message/message.entity';
import { JwtService } from './jwt.service';
import Room from './../rooms/room.entity';
import { RoomsModule } from './../rooms/rooms.module';

@Module({
  providers: [ChatGateway, ChatService, JwtService],
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([User, Message, Room]),
    UserModule,
    MessageModule,
    RoomsModule
  ]
})

export class ChatModule { }
