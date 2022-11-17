import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CreateFakerDto } from './dto/create-faker.dto';
import { FakeFilterDto } from './dto/filter-faker.dto';
import { UpdateFakerDto } from './dto/update-faker.dto';
import { FakerEntity } from './entities/faker.entity';
import { FakerService } from './faker.service';
import { DataResponseDeleted } from './interface/faker-interface';

@Controller('api/v1/item')
export class FakerController {
  constructor(private readonly fakerService: FakerService) {}


  @Get("/all")
  findAll(
    @Query() filterDto: FakeFilterDto,
  ) {
    return this.fakerService.findAll(filterDto);
  }

  
  @Get('/:id')
  getSingleTask(
      @Param('id', ParseIntPipe) id: number,
      ): Promise<FakerEntity> {
      return this.fakerService.getSingleTask(id);
  }


  
  @Post("/create")
  createTask(
      @Body() createFakerDto: CreateFakerDto,
  ): Promise<FakerEntity> {
      return this.fakerService.createNewFaker(createFakerDto);
  }


  @Put('/:id')
  updateFaker(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFakerDto: UpdateFakerDto,
  ): Promise<FakerEntity> {
      return this.fakerService.updateFaker(updateFakerDto, id);
  }


  @Delete('/:id')
  deleteFaker(
      @Param('id', ParseIntPipe) id: number,
      ): Promise<DataResponseDeleted> {
      return this.fakerService.deleteFaker(id)
  }

}
