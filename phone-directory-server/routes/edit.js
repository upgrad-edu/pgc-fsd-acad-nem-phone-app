const express = require('express');
const json = require('body-parser').json;
const mongoose = require('mongoose');
const Users = require('../models/users');


const editRouter = express.Router();

editRouter.use(json());

editRouter.route('/:userId')

.put((req, res, next) => {
    Users.findByIdAndUpdate(req.params.userId, 
      {
        $set: req.body
    }, { new: true }
    )
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
 
  module.exports =editRouter;