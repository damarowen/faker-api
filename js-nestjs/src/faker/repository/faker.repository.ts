import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import {
  DataSource,
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
} from "typeorm";
import { FakeFilterDto } from "../dto/filter-faker.dto";
import { FakerEntity } from "../entities/faker.entity";

@Injectable()
export class FakerRepository {
  constructor(
    @InjectRepository(FakerEntity)
    private fakerRepo: Repository<FakerEntity>,
  ) {}

  async findAll(filterDto: FakeFilterDto): Promise<any> {
    const { price, name, limit, page} = filterDto;

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


    const pagination =  await paginate<FakerEntity>(query, {page, limit});

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


}
