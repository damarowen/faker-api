import { TypeOrmModuleOptions } from "@nestjs/typeorm";
interface DbConfiguration {
  db_config: TypeOrmModuleOptions
}

// return database config object
export const database = (): DbConfiguration => ({
  db_config: {
    type: 'mysql',
    host: "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: "root",
    database: "faker_api",
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.SYNC_SCHEMA === 'true' ? true : false, // disabled for auto migration syncronize
    logging: true,
    maxQueryExecutionTime: 10000,
    keepConnectionAlive: true,
    extra: {
      connectionLimit: 20,
    },
  },
})


