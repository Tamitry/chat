import { CacheModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import * as redisStore from 'cache-manager-redis-store';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Module({
  providers: [RedisCacheService],
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
    })
  ]
})
export class RedisCacheModule implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }


  onModuleInit() {
    console.log('Cache module init');
  }


}
