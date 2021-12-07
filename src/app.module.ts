import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [ChatModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [join(__dirname, '**/*.entity.ts')],
      synchronize: true,
      autoLoadEntities: true
    }),
    CacheModule.register(),
    UserModule,
    MessageModule,
    RedisCacheModule,
    RoomsModule,
  ],
  providers: [],
})
export class AppModule { }
