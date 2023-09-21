import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import {initDB} from '../db/dataSource.js';
import { insertUser, login } from '../controllers/UserController.js';
import {insertRolewithUser} from '../controllers/RoleController.js';
import { NSUser } from '../@types/user.js';

describe('User Controller', () => {
  before(async () => {
    await initDB(); // Initialize the database before tests
  });

  const tmpData = {
    "email": "batool@email.com",
    "password": "123456"
  };

  describe('insertUser', () => {
    it('should insert a user into the database', async () => {
        const payload = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
        }
      const result = await insertUser(payload);
      expect(result).to.be.true; // Assuming your insertUser returns a truthy value on success
    });
  });

  describe('insertRolewithUser', () => {
    it('should insert a user with a role into the database', async () => {
      const payload = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
        type: 'admin', 
      };

      const result = await insertRolewithUser(payload);
      expect(result).to.be.true; // Assuming your insertRolewithUser returns a truthy value on success
    });
  });

  describe('login', () => {
    it('should return a token for a valid user', async () => {
      const token = await login(tmpData.email, tmpData.password);
      expect(token).to.be.a('string');
    });

    it('should throw an error for invalid credentials', async () => {
      const email = 'nonexistentuser@example.com';
      const password = 'wrongpassword';

      try {
        await login(email, password);
        // If login doesn't throw an error, the test should fail
        expect.fail('Expected login to throw an error');
      } catch (error) {
        expect(error).to.equal('Invalid Username or password!');
      }
    });
  });
});
