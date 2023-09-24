import { User } from '../db/Entities/User.js';
import { NSUser } from '../@types/user.js'; 
import dataSource from '../db/dataSource.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const insertUser = (payload: NSUser.Item) => {
 return dataSource.manager.transaction(async transaction => {
  const newUser = User.create({username: payload.type});
  await transaction.save(newUser);
 })
}

const login = async (username: string, password: string) => {
  try {
    const user = await User.findOne({
      where: {email: username}
    });

    const passwordMatching = await bcrypt.compare(password, user?.password || '');

    if (user && passwordMatching) {
      const token = jwt.sign(
        {
          email: user.email,
          fullName: user.username
        },
        process.env.SECRET_KEY || '',
        {
          expiresIn: "2w"
        }
      );

      return {username,token};
    } else {
      throw ("Invalid Username || password!");
    }
  } catch (error) {
    throw ("Invalid Username or password*!");
  }
}


const getUsers = () => {
  try {
    return User.find();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; 
  }
};

export {
  insertUser,
  getUsers,
  login
}