import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import User from './../user/user.entity';
import { UserModule } from './../user/user.module';
import { MessageModule } from './../message/message.module';
import Message from './../message/message.entity';

@Module({
  providers: [ChatGateway, ChatService, AuthService,],
  imports: [
    TypeOrmModule.forFeature([User, Message]),
    UserModule,
    MessageModule
  ]
})

export class ChatModule { }
