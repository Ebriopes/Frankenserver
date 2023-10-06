import "dotenv/config";
import { DataSourceOptions } from "typeorm";

const ENVIRONMENT = (process.env.NODE_ENV = process.env.NODE_ENV || "dev");
const PORT = process.env.PORT || 3000;

const HASH_SALT = Number(process.env.HASH_SALT) || 0;
const COOKIE_SECRET = process.env.COOKIE_SECRET || "";

const TOKEN = {
  secret: process.env.TOKEN_SECRET || "",
  refreshSecrete: process.env.TOKEN_REFRESH_SECRET || "",
  expiresIn: process.env.TOKEN_EXPIRES_IN || "1h",
  refreshExpiresIn: process.env.TOKEN_REFRESH_EXPIRES_IN || "1d",
};

const DB_ENV: DataSourceOptions = {
  type: (process.env.DB_TYPE as "mysql" | "mariadb") || "mysql",
  host: process.env.DB_HOST || "local",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "anonymous",
  password: process.env.DB_PASS || "",
  database: process.env.DB_DATABASE || "test",
};

const SECURE_COOKIE_OPTIONS = {
  httpOnly: true,
  signed: true,
  secure: ENVIRONMENT === "production",
};

export {
  PORT,
  ENVIRONMENT,
  DB_ENV,
  TOKEN,
  HASH_SALT,
  COOKIE_SECRET,
  SECURE_COOKIE_OPTIONS,
};
