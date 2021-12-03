import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import Message from './message.entity';
import User from './../user/user.entity';
import Room from './../rooms/room.entity';
import { RoomsModule } from './../rooms/rooms.module';

@Module({
  providers: [MessageService],
  imports: [
    RoomsModule,
    TypeOrmModule.forFeature([Message, User, Room])
  ],
  exports: [MessageService]
})
export class MessageModule { }
