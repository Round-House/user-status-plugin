import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const microservicesOptions = {
  transport: Transport.REDIS,
  options: {
    //url: 'redis://redis:6379',
    host: 'redis',
    port: 6379,
    /*
    url: `redis://${process.env.REDIS_HOST}:${parseInt(
      process.env.REDIS_PORT,
    )}`,
    */
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microservicesOptions,
  );
  app.listen();
}
bootstrap();
