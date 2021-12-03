import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Room from './room.entity';
import CreateRoomDto from './dto/create-room.dto';
import { UserService } from './../user/user.service';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    private userService: UserService
  ) { }

  async create(dto: CreateRoomDto, userId: number) {
    const room = await this.roomRepository.create(dto);
    const user = await this.userService.getUserById(userId);
    room.users = new Array(user);
    return await this.roomRepository.save(room);
  }

  async addUser(roomId: number, userId: number) {
    const room = await this.roomRepository.findOne(roomId);
    const user = await this.userService.getUserById(userId);
    room.users.push(user);
    return await this.roomRepository.save(room);
  }

  async findOne(roomId: number) {
    return await this.roomRepository.findOne(roomId);
  }

  async findAll() {
    return await this.roomRepository.find();
  }

  async findByUser(userId: number) {
    return await this.roomRepository
      .query(`select * from room
          where room.id in
          (select "roomId" from user_rooms_room
          where "userId" = ${userId});`);
  }

  async rmUser(roomId: number, userId: number) {
    const room = await this.roomRepository.findOne(roomId);
    room.users = room.users.filter(val => val.id != userId);
    return await this.roomRepository.save(room);
  }

  async delete(roomId: number) {
    const room = await this.roomRepository.findOne(roomId);
    return await this.roomRepository.remove(room);
  }
}
