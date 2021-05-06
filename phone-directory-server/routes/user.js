const express = require('express');
const json = require('body-parser').json;
const mongoose = require('mongoose');
const Users = require('../models/users');
const userRouter = express.Router();

userRouter.use(json());

userRouter.route('/')

.get((req,res,next) => {
  Users.find({})
  .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  Users.create(req.body)
  .then((user) => {
      console.log('User Created ', user);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
});
userRouter.route('/:userId')
.delete((req,res,next) => {
    Users.findByIdAndRemove(req.params.userId)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
  module.exports =userRouter;