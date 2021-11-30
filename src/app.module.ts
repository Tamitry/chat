import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { join } from 'path/posix';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ChatModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: 'postgres',
      password: '123Rombik321',
      database: 'chat',
      entities: [join(__dirname, '**/*.entity.ts')],
      synchronize: true,
      autoLoadEntities: true
    }),
    ConfigModule.forRoot(),
    UserModule,
    MessageModule,
    RedisCacheModule,
  ],
  providers: [],
})
export class AppModule { }
