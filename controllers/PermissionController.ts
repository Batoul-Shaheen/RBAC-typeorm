import { Permission } from '../db/Entities/Permission.js';
import dataSource from '../db/dataSource.js';
import { NSUser } from '../@types/user.js';


const insertPermission = async (payload: NSUser.Permission) => {
  try {
    const newPerm = new Permission();
    newPerm.name= "create_post";
    await newPerm.save();
  } catch (error) {
    console.log(error);
    throw ("Something went wrong");
  }
}

export default insertPermission ;

// return dataSource.manager.transaction(async transaction => {
//   const newUser = User.create({username: payload.type});
//   await transaction.save(newUser);
//  })

//  const permission = Permission.create({
//   name: payload.name
// });
// await permission.save();
// return permission;