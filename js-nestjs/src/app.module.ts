import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { database } from './config/database';
import { FakerModule } from './faker/faker.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    load: [database],
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: "root",
    database: "faker_api",
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.SYNC_SCHEMA === 'true' ? true : false, // disabled for auto migration syncronize
    logging: ["error"],
    maxQueryExecutionTime: 10000,
    keepConnectionAlive: true,
    extra: {
      connectionLimit: 20,
    },
  }),
  FakerModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
