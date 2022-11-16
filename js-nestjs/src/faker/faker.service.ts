import { Injectable } from '@nestjs/common';
import { CreateFakerDto } from './dto/create-faker.dto';
import { UpdateFakerDto } from './dto/update-faker.dto';

@Injectable()
export class FakerService {
  create(createFakerDto: CreateFakerDto) {
    return 'This action adds a new faker';
  }

  findAll() {
    return `This action returns all faker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} faker`;
  }

  update(id: number, updateFakerDto: UpdateFakerDto) {
    return `This action updates a #${id} faker`;
  }

  remove(id: number) {
    return `This action removes a #${id} faker`;
  }
}
