const router = require("express").Router();

const { cloudinary } = require('../api/cloudinary')

const Chores = require('./chores-model');

const authenticate = require('../auth/authenticateMW');

//upload image cloudinary

  
  const uploadingImg = file => {
      cloudinary.uploader.upload(file.image.tempFilePath, function(error, result)
      {
        return result
      
      })
      
  } 

router.post('/image', async (req,res) => {
  if(!req.files || !req.files.image) {
    console.log("No image selected")
    const image = {
      url:
      "https://res.cloudinary.com/mikezs/image/upload/v1610650199/baseImageCT_ugi1th.jpg"
    }

    Chores.uploadingImg(image)
      .then(id => res.status(201).json(id[0]))
      .catch(err => res.status(400).json({
        message: "error uploading"
      }))

  } else {
    addImage(req.files)
      .then(image => {
        Chores.uploadingImg(image)
          .then(id => res.status(201).json(id[0]))
      })
      .catch(error => {
        res.status(500).json({
          message: "error adding image"
        })
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