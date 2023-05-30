import { DataSource } from "typeorm";
import { Todo } from "./entities/Todo";
import { env } from "../config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DB.DBHOST,
  port: env.DB.DBPORT || 3306,
  username: env.DB.DBUSERNAME,
  password: env.DB.DBPASSWORD,
  database: env.DB.DBNAME,
  synchronize: true,
  // logging: true,
  entities: [Todo],
  subscribers: [],
  migrations: [],
});

export const db = {
  todo: Todo,
};
