import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('UITOUX Garage Rest Api')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  app.enableCors();

  await app.listen(process.env.PORT);
}
bootstrap();
