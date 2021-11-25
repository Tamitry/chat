import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { join } from 'path/posix';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [ChatModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123Rombik321',
      database: 'chat',
      entities: [join(__dirname, '**/*.entities.ts')],
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    MessageModule,
  ],
  providers: [],
})
export class AppModule { }
