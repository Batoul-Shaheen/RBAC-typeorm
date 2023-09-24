import express from 'express';
import {insertRole,insertRolewithUser} from '../controllers/RoleController.js'
import { authenticate } from '../middlewares/auth/authenticate.js';

const router = express.Router();

router.post('/role', (req, res, next) => {
    insertRole(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });
  
  router.post('/roleUser', (req, res, next) => {
    insertRolewithUser(req.body).then((data) =>{
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
  });

  export default router;