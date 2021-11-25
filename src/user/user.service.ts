import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async getUserById(id: number) {
    const user = <User>await this.userRepository.findOne(id);
    return user;
  }
}
