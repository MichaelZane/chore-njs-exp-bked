const db = require("../database/dbConfig")


module.exports = {
get,
insert,
getChore,
findById,
update,
remove,


}
async function get() {
  return await db('chore')
}

//adding a chore 
async function insert(chores) {
  return db('chore')
    .insert(chores)
    .then(ids => {
      return findById(ids[0])
    })
    
  }




// function addChore(choreData, id) {
//   const newChore = {...choreData, chore_id: id }
//     return db('chore')
//     .insert(newChore)
//     .then(() => {
//       return getChore(id)
//     })
// }


// grab all resources in table


function findById(id) {
    return db('chore')
      .where({ id })
      .first()
  }

  function update(changes, id) {
    return db('chore')
      .where('id', Number(id))
      .update(changes);
  }
  function remove(id) {
    return db("chore")
      .where({ id })
      .del();
  }
  function getChore(id) {
  return db('chore as c')
    .join('child as chd', 'chd.id', 'c.child_id')
    .select('c.name as chore_name', 'c.id as chore_id', 'c.description', 'c.comments', 'c.Completed','c.due_date', 'c.chore_score', 'c.bonus_pts', 'c.clean_strk', 'c.photo_obj',)
    .where('c.chore_id', id)
    .orderBy('c.id');
}



