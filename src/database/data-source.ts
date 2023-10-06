import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_ENV } from "../config";
import { User } from "../entity/User";
import MIGRATIONS from "../migrations";

export const AppDataSource = new DataSource({
  ...DB_ENV,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: MIGRATIONS,
  // migrationsTableName: "initial_migration",
  subscribers: [],
});
