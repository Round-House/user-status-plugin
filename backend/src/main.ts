import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const microservicesOptions = {
  transport: Transport.REDIS,
  options: {
    host: 'redis',
    port: 6379,
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
