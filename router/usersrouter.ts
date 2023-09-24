import express from 'express';
import { validateUser } from '../middlewares/validation/user.js';
// import { authorize } from '../middlewares/auth/authorize.js';
import insertPermission  from '../controllers/PermissionController.js'
import {insertUser,getUsers,login} from '../controllers/UserController.js'
import {insertRole,insertRolewithUser} from '../controllers/RoleController.js'
import { authenticate } from '../middlewares/auth/authenticate.js';

const router = express.Router();

router.post('/', validateUser, (req, res, next) => {
    insertUser(req.body).then(() => {
      res.status(201).send()
    })
  });

  router.post('/role', authenticate, (req, res, next) => {
    insertRole(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });
  
  router.post('/roleUser', authenticate, (req, res, next) => {
    insertRolewithUser(req.body).then((data) =>{
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
  });
  
  router.post('/permission', authenticate, (req, res, next) => {
    insertPermission(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(email && password) {
      login(email,password).then(data=> {
          res.status(200).send(data);
      }).catch(err=> {
          res.status(404).send(err);
      })
      } 
      else {
          res.status(400).send(`Invalid email or password.`);
      }
});

router.get('/user', authenticate, async (req, res, next) => {
    try {
      const users = await getUsers();
      res.send(users);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  });

router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

  export default router;