import { DataSource } from "typeorm";
import { Permission } from './Entities/Permission.js'
import { Profile } from "./Entities/Profile.js";
import { Role } from "./Entities/Role.js";
import { User } from "./Entities/User.js";

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: '',
  database: 'rbac',
  entities: [ Permission, Profile,Role,User],
  // migrations: ['./**/migration/*.ts'],
  synchronize: true,
  logging: false,
});

const initialize = () => {
  dataSource
    .initialize()
    .then(() => {
      console.log("Connected to DB!");
    })
    .catch((err) => {
      console.error("Failed to connect to DB: " + err);
    });
};

export default { initialize, dataSource };
