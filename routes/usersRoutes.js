const express = require('express');
const UsersService = require('./../services/usersService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { createUserSchema, updateUserSchema, showUserSchema, resetPassSchema } = require('./../schemas/usersSchemas');

const router = express.Router();
const userService = new UsersService();


router.get('/', async (req, res) => {
  const users = await userService.find();
  res.json(users)
});

router.get('/:id',
  validatorHandler( showUserSchema, 'params' ),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const users = await userService.findOne(id);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/create',
  validatorHandler( createUserSchema, 'body' ),
  async (req, res) => {
    const body = req.body;
    const newUser = await userService.create(body);
    res.status(201).json({
      message: 'created',
      data: newUser
    });
  }
);

router.put('/updateProfile/:id',
  validatorHandler( showUserSchema, 'params' ),
  validatorHandler( updateUserSchema, 'body' ),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await userService.updateProfile(id, body);
      res.status(200).json({
        message: 'updateProfile',
        data: user,
        id: id
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/resetPass/:id',
  validatorHandler( showUserSchema, 'params' ),
  validatorHandler( resetPassSchema, 'body' ),
  (req, res) =>{
    const { id } = req.params;
    const body = req.body;
    const user = userService.resetPass(id, body.password);
      res.status(200).json({
        message: 'resetPass',
        data: user,
        id: id
      });
  }
);

router.patch('/toDisable/:id', (req, res) =>{
  const { id } = req.params;
  const user = userService.toDisabled(id);
  res.json({
    message: 'User inactive',
    id: user
  });
});

module.exports = router;
