import { Role } from '../db/Entities/Role.js';
import { NSUser } from '../@types/user.js'
import { Permission } from '../db/Entities/Permission.js';
import dataSource from '../db/dataSource.js';
import { User } from '../db/Entities/User.js';
import { In } from 'typeorm';


const insertRolewithUser = (payload : NSUser.Item) => {
  return dataSource.manager.transaction(async transaction => {
    const role = await Role.findOneBy({ name: payload.type });
    const newUser = User.create({
      ...payload,
    });
    await transaction.save(newUser);
  });
}
const insertRole = async (payload: NSUser.Role) => {
  try {
    const role = new Role();
    role.name= payload.name
    role.permissions = await Permission.findBy({
      id: In(payload.permissions)
    });
    await role.save();
    return role;
  } catch (error) {
    throw ("Something went wrong");
  }
};


export {insertRole,insertRolewithUser};