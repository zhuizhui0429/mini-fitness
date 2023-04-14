/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodModule } from './Food/food.module'
import { HttpModule } from '@nestjs/axios'
import { UserModule } from './User/user.module';
import { DietModule } from './Diet/diet.module'
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { getRandomFileName, acceptMimeTypes } from './utils'
import { port, rootStaticDir } from './main'
import { join } from 'path'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zzxcxy666',
      database: 'mini-fitness',
      autoLoadEntities: true,
      synchronize: true,
      verboseRetryLog: true,
      retryAttempts: 3,
      retryDelay: 3000,
      timezone: 'Z'
    }),
    FoodModule,
    HttpModule,
    UserModule,
    DietModule,
    MulterModule.register({
      fileFilter(req, file, cb) {
        const type = file.mimetype.split('/')[0];
        if (!acceptMimeTypes.includes(type)) {
          cb(
            new Error(
              `暂不支持${file.originalname.slice(
                file.originalname.lastIndexOf('.') + 1,
              )}类型的文件`,
            ),
            false,
          );
          return;
        }
        // 解决中文名乱码的问题 latin1 是一种编码格式
        file.originalname = Buffer.from(file.originalname, 'latin1').toString(
          'utf8',
        );
        cb(null, true);
      },
      storage: diskStorage({
        //destination为函数时，需要手动创建相应的目录
        destination(
          req,
          file: Express.Multer.File & Record<'assetType', string>,
          cb,
        ) {
          const { mimetype } = file;
          const type = mimetype.split('/')[0];
          let assetType = '';
          let finalDir = '';
          switch (type) {
            case 'image':
              assetType = 'images';
              break;
            case 'video':
              assetType = 'videos';
              break;
            default:
              assetType = 'files';
          }
          finalDir = join(rootStaticDir, assetType);
          file.assetType = assetType;
          cb(null, finalDir);
        },
        filename(
          req,
          file: Express.Multer.File & Record<'url' | 'assetType', string>,
          cb,
        ) {
          const { originalname } = file;
          const name = getRandomFileName(originalname);
          file.url = `http://localhost:${port}/assets/${file.assetType}/${name}`;
          cb(null, name);
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
