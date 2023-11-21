import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_ENV } from "../config";
import { Permissions, Role, User, UserRoles } from "../entity";
import MIGRATIONS from "../migrations";

export const AppDataSource = new DataSource({
  ...DB_ENV,
  entities: [User, Permissions, Role, UserRoles],
  migrations: MIGRATIONS,
  // migrationsTableName: "initial_migration",
  subscribers: [],
});
