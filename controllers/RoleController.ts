import express from 'express'
import { Role } from '../db/Entities/Role.js';

var  router = express.Router();
router.post('/', async (req, res) => {
  try {
    const { permissions, ...roleData } = req.body;

    const newRole = new Role();
    await newRole.save();

    if (permissions && permissions.length > 0) {
      await newRole.addPermissions(permissions); 
    }
    res.status(201).send( newRole );
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

export default router;