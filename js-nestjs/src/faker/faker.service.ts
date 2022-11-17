import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pagination } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { CreateFakerDto } from "./dto/create-faker.dto";
import { FakeFilterDto } from "./dto/filter-faker.dto";
import { UpdateFakerDto } from "./dto/update-faker.dto";
import { FakerEntity } from "./entities/faker.entity";
import { FakerRepository } from "./repository/faker.repository";

@Injectable()
export class FakerService {
    constructor(
    private fakerRepo: FakerRepository
  ) {}

  findAll(filterDto: FakeFilterDto): Promise<Pagination<FakerEntity>> {
    return this.fakerRepo.findAll(filterDto)
  }


}
