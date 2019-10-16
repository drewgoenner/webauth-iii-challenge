const express = require('express');
const protected = require('./restricted-middleware.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = require('./generate-token.js')
const Users = require('./user-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('WebAuth III Challenge Accepted!');
});

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    Users.add(user)
      .then(saved => {
          res.status(201).json(saved);
      })
      .catch(err => {
          res.status(500).json(err);
      });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

        Users.findBy({ username })
          .first()
          .then(user => {
              if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);

                res.status(200).json({ 
                  message: `Welcome, ${user.username}`,
                  token
            });
              } else {
                  res.status(401).json({ message: 'Invalid User/Pass'});
              }
          })
          .catch(err => {
              res.status(500).json(err);
          });
    
    
});

router.get('/users', protected, (req, res) => {
    Users.find()
      .then(users => {
          res.json(users);
      })
      .catch(err => {
          res.status(500).json(err);
      });
});

module.exports = router;