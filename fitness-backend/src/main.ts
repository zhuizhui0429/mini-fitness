import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './execption.filter';
import { TransformInterceptor } from './interceptor'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { getDataSource } from './db'
import { join } from 'path';
import * as express from 'express';

export const port: number = 3000
export const rootStaticDir = join(__dirname, '..', 'assets')

async function bootstrap() {
  await getDataSource();
  const app = await NestFactory.create(AppModule);
  app.use('/assets/images', express.static(join(rootStaticDir, 'images')));
  app.use('/assets/videos', express.static(join(rootStaticDir, 'videos')));
  app.use('/assets/files', express.static(join(rootStaticDir, 'files')));
  const config = new DocumentBuilder()
    .setTitle('mini-fitness-backend')
    .setDescription('小程序后端')
    .setVersion('1.0')
    .build();
  app.useGlobalFilters(new AllExceptionFilter()); // 全局使用AllExceptionFilter处理错误
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));// 全局使用转换拦截器对response进行格式统一
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(port);
}
bootstrap();
