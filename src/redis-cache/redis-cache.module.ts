import { CacheInterceptor, CacheModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import * as redisStore from 'cache-manager-redis-store';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [RedisCacheService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }],
  exports: [RedisCacheModule],
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          store: redisStore,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT
        }
      },
    }),
    CacheModule.register({
      ttl: 60 * 60
    })
  ]
})
export class RedisCacheModule implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }


  onModuleInit() {
    console.log('Cache module init');
  }


}
