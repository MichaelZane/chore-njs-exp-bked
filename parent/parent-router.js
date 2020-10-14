const router = require('express').Router();

const Parent = require('./parent-model');

const Child = require('../child/child-model')

const authenticate = require('../auth/authenticateMW');

router.get('/justparent/:id', authenticate, (req, res) => {
 
  const { id } = req.params;
 
  Parent.get(id)
    .then(parents => {
      res.json(parents);
    })
    
    .catch(err => res.send(err));
  
});


//return an array of children by parent id

router.get('/:id', authenticate, (req, res) => {
  const { id } = req.params;

  Parent.findById(id)
  .then(parent => {
    if (parent) {
      Parent.getChildById(id) // if child is found then get chore by id
        .then(child => {
          let addChild = []
          if(child.length) {
            addChild = child // if chore exists add it to array
          }
          res.status(200).json({ child: addChild }) // return array of parents children
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ message: 'Failed at finding any children for parent' });
        });
    } else {
      res.status(404).json({ message: 'Could not find children for this parent' })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'Failed to get children' });
  });
});

// edit parents info

router.put('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Parent.findById(id)
  .then(parent => {
    if (parent) {
      Parent.update(changes, id)
      .then(updatedParent => {
        res.json(updatedParent);
      });
    } else {
      res.status(404).json({ message: 'Could not find parent with given id' });
    }
  })
  .catch (err => {
    console.log(err)
    res.status(500).json({ message: 'Failed to update parent' });
  });
});

// delete a parent

router.delete('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  console.log(id);

  Parent.remove(id)
  .then(deleted => {
      console.log(deleted)
      if (deleted) {
          res.status(200).json(deleted);
    } else {
      res.status(404).json({ message: 'This parent does not exist' })
    }
  })
  .catch (err => {
      console.log(err)
      res.status(500).json({message: 'Failed to delete parent from database'})
  })
})
  
module.exports = router;