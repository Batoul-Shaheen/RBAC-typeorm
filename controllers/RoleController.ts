import { Role } from '../db/Entities/Role.js';
import { NSUser } from '../@types/user.js'
import { Permission } from '../db/Entities/Permission.js';
import dataSource from '../db/dataSource.js';
import { User } from '../db/Entities/User.js';
import { In } from 'typeorm';


const insertRolewithUser = async (payload: NSUser.Item) => {
  try {
    const role = await Role.findOneBy({ name: payload.type });
    if (!role) {
      throw new Error(`Role with name ${payload.type} not found`);
    }

    const newUser = User.create({
      ...payload,
    });

    await dataSource.manager.transaction(async (transaction) => {
      await transaction.save(newUser);
    });
    return newUser;
  } catch (error) {
    console.error('Error inserting user with role:', error);
    throw error; 
  }
};

const insertRole = async (payload: NSUser.Role) => {
  try {
    const role = new Role();
    role.name= 'Admin'
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