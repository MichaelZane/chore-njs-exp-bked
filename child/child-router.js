const router = require("express").Router();

const Child = require("./child-model");

const authenticate = require("../auth/authenticateMW");

router.get("/justchild/:id", authenticate, (req, res) => {

  const { id } = req.params;

  Child.get(id)
    .then(chores => {
      res.json(chores);
    })
    .catch(err => res.send(err));
});
// get child by id and chores by child_id

// return an array of chores by child id

router.get('/:id', authenticate, (req, res) => {
  const { id } = req.params;

  Child.findById(id)
  .then(child => {
    if (child) {
      Child.getChoreById(id) // if child is found then get chore by id
        .then(chore => {
          let addChore = []
          if(chore.length) {
            addChore = chore // if chore exists add it to array
          }
          res.json({ chore: addChore })
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed getting chore' });
        });
    } else {
      res.status(404).json({ message: 'Could not get chore for child' })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'Failed to get chore' });
  });
});

router.put('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Child.findById(id)
  .then(child => {
    if (child) {
      Child.update(changes, id)
      .then(updatedChild => {
        res.json(updatedChild);
      });
    } else {
      res.status(404).json({ message: 'Could not find child with given id' });
    }
  })
  .catch (err => {
    console.log(err.res)
    res.status(500).json({ message: 'Failed to update child' });
  });
});

router.delete('/:id', authenticate, (req, res) => {
  const { id } = req.params;

  Child.remove(id)
    .then(deleted => {

      if (deleted) {
          res.status(200).json(deleted);
      } else {
        res.status(404).json({ message: 'This child does not exist' })
      }
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({message: 'Failed to delete child from database'})
    })
})


module.exports = router;
