import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  paginate,
} from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { CreateFakerDto } from "../dto/create-faker.dto";
import { FakeFilterDto } from "../dto/filter-faker.dto";
import { UpdateFakerDto } from "../dto/update-faker.dto";
import { FakerEntity } from "../entities/faker.entity";

@Injectable()
export class FakerRepository {
  constructor(
    @InjectRepository(FakerEntity)
    private fakerRepo: Repository<FakerEntity>,
  ) {}

  async findAll(filterDto: FakeFilterDto): Promise<any> {
    const { price, name, limit, page } = filterDto;

    const query = this.fakerRepo.createQueryBuilder("faker");

    if (price) {
      //* %${search}% is variabel to search partial
      query.andWhere("(faker.price LIKE :price)", { price: `%${price}%` });
    }

    if (name) {
      //* %${search}% is variabel to search partial
      query.andWhere("(faker.name LIKE :name)", {
        name: `%${name.toLowerCase()}%`,
      });
    }

    const pagination = await paginate<FakerEntity>(query, { page, limit });

    return {
      result: pagination.items,
      pagination: {
        limit: pagination.meta.itemsPerPage,
        page: pagination.meta.currentPage,
        total: pagination.meta.totalItems,
        total_page: pagination.meta.totalPages,
      },
    };
  }

  async findOne(id: number): Promise<FakerEntity> {
    return this.fakerRepo.findOne({ where: { id } })
  }

  async createNewFaker(createFakerDto: CreateFakerDto): Promise<FakerEntity> {
    const { name, description, price } = createFakerDto;

    const f = new FakerEntity();
    f.name = name;
    f.description = description;
    f.price = price;

    await f.save();

    return f;
  }


  
  async updateFaker(updateFakerDto: UpdateFakerDto, id: number): Promise<FakerEntity> {

    const f = await this.fakerRepo.findOne({ where: { id } })

    if (!f) {
      throw new NotFoundException(`Task with ${id} not found`)
    }

    updateFakerDto.id = f.id
    await this.fakerRepo.save(updateFakerDto)
     return await this.fakerRepo.findOne({ where: { id } })
  }


  async deleteFaker(id: number): Promise<any> {

    return await this.fakerRepo.delete({ id })
     
  }
}
