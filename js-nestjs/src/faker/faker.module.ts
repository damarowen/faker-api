import { Module } from '@nestjs/common';
import { FakerService } from './faker.service';
import { FakerController } from './faker.controller';
import { FakerEntity } from './entities/faker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FakerRepository } from './repository/faker.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FakerEntity])
  ],
  controllers: [FakerController],
  providers: [FakerService,FakerRepository],
})
export class FakerModule {}
