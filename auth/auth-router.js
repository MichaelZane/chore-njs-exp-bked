const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config/secrets')
const Parent = require('../parent/parent-model');
const Child = require('../child/child-model')
const jwt = require('jsonwebtoken')

//.
//for endpoints beginning with /api/auth
// register  Parent
router.post('/register', async (req, res) => {
 
  let {  fname, lname, email, username, password } = req.body

  try {
    const hash = bcrypt.hashSync(password, 12)
    password = hash
    const saved = await Parent.insert({
      fname,
      lname,
      email,
      username,
      password
    })
    
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

//register the child
router.post('/register/child', async (req, res) => {
 
  let { fstname, lstname, username, password, parent_id } = req.body

  try {
    const hash = bcrypt.hashSync(password, 12)
    password = hash
    const save = await Child.insert({  
      fstname,
      lstname, 
      username,
      password,
      parent_id
      
    })

    res.status(201).json(save)

  } catch (err) {
    res.status(500).json(err.message)
  }
})

// login for the parent

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Parent.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user)
        const user_id = user.id;
        const username = user.username;

        res.status(200).json({
          message: `Welcome ${username} you are logged in !`,
          token, username, user_id
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});

// login for the child

router.post('/login/child', (req, res) => {
  let { username, password, id } = req.body;

  Child.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user)

        res.status(200).json({
          message: `Hello, ${username} you have just logged in`,
          token, parent_id, 
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});



function makeToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  } 
  const options = {
    expiresIn: '8h'
  }
  return jwt.sign(payload, jwtSecret, options)
}
module.exports = router;