import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, EntityManager, EntityRepository, getManager, Repository } from "typeorm";
import { FakerEntity } from "../entities/faker.entity";

@Injectable()
export class FakerRepository {

  constructor(
    @InjectRepository(FakerEntity)
    private fakerRepo: Repository<FakerEntity>,
  ) {}

  async getTasks(
    ): Promise<FakerEntity[]> {

    const tasks = await this.fakerRepo.find()
    return tasks;
  }


}