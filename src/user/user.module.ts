import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import User from './user.entity';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService]
})
export class UserModule { }
