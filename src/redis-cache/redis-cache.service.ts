import { Inject } from '@nestjs/common';
import { CACHE_MANAGER, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) { }

  async get(key) {
    console.log('Get method from cache');

    await this.cache.get(key);
  }

  async set(key, value) {
    console.log('Set method from cache');

    await this.cache.set(key, value);
  }
}
