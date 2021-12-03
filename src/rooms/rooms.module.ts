import { CacheModule, Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Room from './room.entity';
import User from './../user/user.entity';
import { UserModule } from './../user/user.module';

@Module({
  providers: [RoomsService],
  controllers: [RoomsController],
  imports: [
    TypeOrmModule.forFeature([Room, User]),
    UserModule,
    CacheModule.register({
      ttl: 60 * 60,
      max: 100
    })
  ],
  exports: [
    RoomsService
  ]
})
export class RoomsModule { }
