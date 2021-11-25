import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [
    TypeOrmModule.forFeature([])
  ]
})

export class ChatModule { }
