import { Body, CacheInterceptor, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import CreateRoomDto from './dto/create-room.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('rooms')
export class RoomsController {
  constructor(
    private roomsService: RoomsService
  ) { }

  //@Get('user/:userid')
  @MessagePattern('get-users-rooms')
  @UseInterceptors(CacheInterceptor)
  async findByUser(userId: number) {
    return this.roomsService.findByUser(userId);
  }

  @Post(':userid')
  async create(@Body() dto: CreateRoomDto, @Param('userid') userId: number) {
    return this.roomsService.create(dto, userId);
  }

  @Get('room/:roomid')
  async findOne(@Param('roomid') roomId: number) {
    return this.roomsService.findOne(roomId);
  }

  @Get()
  async findAll() {
    return this.roomsService.findAll();
  }

  @Delete(':roomid/:userid')
  async removeUser(@Param('userid') userId: number
    , @Param('roomid') roomId: number) {
    return this.roomsService.rmUser(roomId, userId)
  }

  @Delete(':roomid')
  async deleteRoom(@Param('roomid') roomid: number) {
    return this.roomsService.delete(roomid);
  }
}
