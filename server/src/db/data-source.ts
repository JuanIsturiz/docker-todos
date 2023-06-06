import { DataSource } from "typeorm";
import { Todo } from "./entities/Todo";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "dbpassword",
  database: "dockertodosdb",
  synchronize: true,
  // logging: true,
  entities: [Todo],
  subscribers: [],
  migrations: [],
});

export const db = {
  todo: Todo,
};
