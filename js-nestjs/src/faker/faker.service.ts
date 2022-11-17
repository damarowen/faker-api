import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFakerDto } from "./dto/create-faker.dto";
import { UpdateFakerDto } from "./dto/update-faker.dto";
import { FakerEntity } from "./entities/faker.entity";
import { FakerRepository } from "./repository/faker.repository";

@Injectable()
export class FakerService {
    constructor(
    private fakerRepo: FakerRepository
  ) {}

  findAll(): Promise<FakerEntity[]> {
    return this.fakerRepo.getTasks()
  }
}
