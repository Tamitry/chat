import { CacheKey, CacheTTL } from '@nestjs/common';
import { CacheInterceptor, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

  ) { }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('user')
  @CacheTTL(300)
  async getUserById(id: number) {
    const user = <User>await this.userRepository.findOne(id);
    console.log('----');

    return user;
  }
}
