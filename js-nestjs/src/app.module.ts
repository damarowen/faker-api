import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FakerModule } from './faker/faker.module';

@Module({
  imports: [FakerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
