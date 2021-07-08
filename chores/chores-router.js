const router = require("express").Router();

const Chores = require('./chores-model');

const authenticate = require('../auth/authenticateMW');


//upload image cloudinary

// router.post('/image', async (req,res) => {
//   try {

//     if(req.chore_score >= 25) {
//       return res.json("max chore score of 25")
//     } else {

//     const fileStr = req.body.data;    
//     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//       use_filename: true,
//       unique_filename: false
//     },       
//       function(error, result){
//       console.log(error, result)

//     })
//     console.log(uploadResponse.url); 
//     const image = JSON.stringify(uploadResponse.url)

//     Chores.addImage(image)
//     .then(res => {
//       console.log(res.image)
      
//     })
//     .catch(err => console.error(err))
//   }
//   }catch (err) {
//     console.error(err);
//     res.status(500).json({ err: 'Something went wrong' });
//   } 
 
// })

// get all chores

router.get('/', authenticate, (req, res) => {
  Chores.getAll()
  .then(chore => {
    res.json(chore)
  })
  .catch(err => res.send(err))
})

router.get('/chores/:id', authenticate, ( req, res ) => {
  const { id } = req.params;
  
  Chores.getByChildId(child_id)
    .then(chore => {
      res.json(chore)
    }) 
    .catch(err => res.send(err))
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

  Chores.remove(id)
  .then(deleted => {
      
      if (deleted) {
          res.status(200).json(deleted);
    } else {
      res.status(404).json({ message: 'This chore does not exist' })
    }
  })
  .catch (err => {
      console.log(err)
      res.status(500).json({message: 'Failed to delete chore from database'})
  })
})
  
module.exports = router;