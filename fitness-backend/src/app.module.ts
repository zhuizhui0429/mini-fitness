/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodModule } from './Food/food.module'
import { HttpModule } from '@nestjs/axios'
import { UserModule } from './User/user.module';
import { DietModule } from './Diet/diet.module'

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
    DietModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
