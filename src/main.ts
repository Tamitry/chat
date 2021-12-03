import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

/* async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log("This server run");

} */
async function bootstrap() {


  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379'
    }
  });


  await app.listen();
  console.log("This server run");

}

bootstrap();
