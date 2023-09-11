import { DataSource } from "typeorm";
import { Permission } from './Entities/Permission.js'
import { Profile } from "./Entities/Profile.js";
import { Role } from "./Entities/Role.js";
import { User } from "./Entities/User.js";

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ Permission, Profile,Role,User],
   migrations: ['./**/migration/*.ts'],
  synchronize: true,
  logging: false,
});

dataSource.initialize().then(() => {
  console.log("Connected to DB!");
}).catch(err => {
  console.error('Failed to connect to DB: ' + err);
});


export default { dataSource };
