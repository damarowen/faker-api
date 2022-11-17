import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pagination } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { CreateFakerDto } from "./dto/create-faker.dto";
import { FakeFilterDto } from "./dto/filter-faker.dto";
import { UpdateFakerDto } from "./dto/update-faker.dto";
import { FakerEntity } from "./entities/faker.entity";
import { DataResponseDeleted } from "./interface/faker-interface";
import { FakerRepository } from "./repository/faker.repository";



@Injectable()
export class FakerService {
    constructor(
    private fakerRepo: FakerRepository
  ) {}

  async findAll(filterDto: FakeFilterDto): Promise<Pagination<FakerEntity>> {
    return this.fakerRepo.findAll(filterDto)
  }


  async getSingleTask(
    id: number,
): Promise<FakerEntity> {
    const found = await this.fakerRepo.findOne(id)

    if (!found) {
        throw new NotFoundException(`Task with ${id} not found`)
    }

    return found
}

async createNewFaker(
  createTaskDto: CreateFakerDto,
): Promise<FakerEntity> {

  return this.fakerRepo.createNewFaker(createTaskDto);

}

async updateFaker(
  updateFakerDto: UpdateFakerDto,
  id: number,
): Promise<FakerEntity> {

  return this.fakerRepo.updateFaker(updateFakerDto, id);

}

async deleteFaker(
  id: number,
): Promise<DataResponseDeleted> {

  const res = await this.fakerRepo.deleteFaker(id)

  if (res.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
  }

  const data: DataResponseDeleted = {
      id: id,
      message: 'delete'
  }

  return data

}

}
