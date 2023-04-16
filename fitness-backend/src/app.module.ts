/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodModule } from './Food/food.module'
import { HttpModule } from '@nestjs/axios'
import { UserModule } from './User/user.module';
import { DietModule } from './Diet/diet.module'
import { ScheduleModule } from './Schedule/schedule.module';
import { MediaModule } from './Media/media.module';
import { FileModule } from './fileModule'



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zzxcxy666',
      database: 'mini-fitness',
      synchronize: true,
      verboseRetryLog: true,
      retryAttempts: 3,
      retryDelay: 3000,
      timezone: 'Z',
      autoLoadEntities: true
      // entities: [
      //   __dirname + '/entities.ts',
      // ],
    }),
    FoodModule,
    HttpModule,
    UserModule,
    DietModule,
    ScheduleModule,
    MediaModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
