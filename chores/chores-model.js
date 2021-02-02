const db = require("../database/dbConfig")


module.exports = {
get,
insert,
getChore,
findById,
update,
remove,
addImage


}
function get(id) {
  return db('chore as c')
    .select("c.id", "c.child_id","c.name", "c.description", "c.comments", "c.completed", "c.due_date", "c.chore_score", "c.bonus_pts", "c.clean_strk", "c.photo_obj")
    .where({ id })
    .first();
}
//adding a chore 
function insert(chores) {
  return db('chore')
    .returning('id', 'child_id', 'name', 'description', 'comments', 'completed', 'due_date', 'chore_score', 'bonus_pts', 'clean_strk', 'img_id')
    .insert(chores, "id");
}

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

function addImage(image) {
  return db("images")
    .returning(['img_url', 'id'])
    .insert({img_url: image}, "id")
    

}



