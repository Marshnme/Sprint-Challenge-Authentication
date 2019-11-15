const router = require('express').Router();
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password,10);
  user.password = hash;

  db('users').insert(user)
  .then(newUser => {
    res.status(200).json(newUser) 
  })
  .catch(err => {
    res.status(500).json({message:"Couldnt register user"})
  })
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  db('users').where({username})
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = getJwtToken(user);
      res.status(200).json({message:`Welcome ${user.username} `,token});
    }else{
      res.status(401).json({message:'invalid creds'})
    }
    
  })
  .catch(err => {
    res.status(500).json({message:'login error'})
  })
});

function getJwtToken(user){
  const payload = {
    id: user.id,
    name: user.username,
};
const secret = process.env.JWT_SECRET || 'hehe cant see me'
const options = {
    expiresIn:'1h'
};

return jwt.sign(payload,secret,options) 
}

module.exports = router;
