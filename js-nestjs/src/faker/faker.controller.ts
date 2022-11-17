import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FakeFilterDto } from './dto/filter-faker.dto';
import { FakerService } from './faker.service';

@Controller('api/v1/data')
export class FakerController {
  constructor(private readonly fakerService: FakerService) {}


  @Get("/all")
  findAll(
    @Query() filterDto: FakeFilterDto,
  ) {
    return this.fakerService.findAll(filterDto);
  }

}
