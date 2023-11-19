import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_ENV } from "../config";
import { Permissions, Roles, User, UserRoles } from "../entity";
import MIGRATIONS from "../migrations";

export const AppDataSource = new DataSource({
  ...DB_ENV,
  entities: [User, Permissions, Roles, UserRoles],
  migrations: MIGRATIONS,
  // migrationsTableName: "initial_migration",
  subscribers: [],
});
