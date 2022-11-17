import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database } from './config/database';
import { FakerModule } from './faker/faker.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FakerEntity } from './faker/entities/faker.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    load: [database],
  }),
  TypeOrmModule.forRootAsync({
    useFactory: (configs: ConfigService) => configs.get("db_config"),
    inject: [ConfigService],
  }),  FakerModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
