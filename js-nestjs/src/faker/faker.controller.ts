import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FakerService } from './faker.service';

@Controller('api/v1/data')
export class FakerController {
  constructor(private readonly fakerService: FakerService) {}


  @Get("/all")
  findAll() {
    return this.fakerService.findAll();
  }

}
