const router = require("express").Router();

const { cloudinary } = require('../api/cloudinary')

const Chores = require('./chores-model');

const authenticate = require('../auth/authenticateMW');

//uploading image configuration

router.post('/image', async (req,res) => {
  try {
    const fileStr = req.body.data
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      resource_type: "image",
      use_filename: true, 
    }, function(error, result){console.log(result, error)})
    console.log(uploadResponse)
    const saved = await Chores.addImage(fileStr)
    res.status(201).json({
      message: "SUCCESS",
      saved
    })
      
  } catch (err) {
    console.error(err)
    res.status(500).json({
      err: 'Something went wrong'
      
    })
  }

})

// get a chore by id in database

router.get('/singlechore/:id', authenticate, (req, res) => {
  
  const { id } = req.params;

  Chores.get(id)
    .then(chore => {
      res.json(chore);
    })
    .catch(err => res.send(err));
});

// add a chore to the database

router.post('/', authenticate, (req, res) => {
  
  Chores.insert(req.body)
 
    .then(saved => { 
         
      res.status(201).json(saved);

    })
    .catch(error => {
      res.status(500).json(error);
      console.log(error)
    });
});

// edit chores by id

router.put('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Chores.findById(id)
  .then(chore => {
    if (chore) {
      Chores.update(changes, id)
      .then(updatedChore => {
        res.json(updatedChore);
      });
    } else {
      res.status(404).json({ message: 'Could not find chore with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update chore' });
  });
});
 
// delete a chore by id

router.delete('/delete/:id', authenticate, (req, res) => {
  const { id } = req.params;
  console.log(id);

  Chores.remove(id)
  .then(deleted => {
      console.log(deleted)
      if (deleted) {
          res.status(200).json(deleted);
    } else {
      res.status(404).json({ message: 'This person does not exist' })
    }
  })
  .catch (err => {
      console.log(err)
      res.status(500).json({message: 'Failed to delete person from database'})
  })
})
  
module.exports = router;