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
import { CreateFakerDto } from './dto/create-faker.dto';
import { UpdateFakerDto } from './dto/update-faker.dto';

@Controller('faker')
export class FakerController {
  constructor(private readonly fakerService: FakerService) {}

  @Post()
  create(@Body() createFakerDto: CreateFakerDto) {
    return this.fakerService.create(createFakerDto);
  }

  @Get()
  findAll() {
    return this.fakerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fakerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFakerDto: UpdateFakerDto) {
    return this.fakerService.update(+id, updateFakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fakerService.remove(+id);
  }
}
