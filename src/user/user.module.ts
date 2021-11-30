import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import User from './user.entity';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    RedisCacheModule,
    CacheModule.register({
      ttl: 60 * 60 * 24,
      max: 60 * 60 * 7 * 24
    })
  ],
  exports: [UserService]
})
export class UserModule { }
