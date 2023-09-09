import express from "express";
import db from "./db/dataSource.js";
import UserController from './controllers/UserController.js';
import PermissionController from './controllers/PermissionController.js';
import RoleController from './controllers/RoleController.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users' , UserController );
app.use('/permissions', PermissionController);
app.use('/roles' , RoleController);

app.get("/", (req, res) => {
  res.send("Server UP !");
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
  db.initialize();
});

export default app;
