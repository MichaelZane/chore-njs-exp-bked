const db = require('../database/dbConfig');

module.exports = {
  insert,
  find,
  findBy,
  findById,
  getChoreById,
  getChild,
  get,
  update,
  remove
};
// returns all child details
function get(id) {
  return db('child as c')
    .select("c.id", "c.parent_id","c.fstname", "c.lstname", "c.username", "c.password")
    .where({ id })
    .first();
}

function find() {
  return db('child').select('id', 'username');
}
// added for a filter
function findBy(filter) {
  return db('chore')
    .where(filter);
}

// adding a child
function insert(user) {
  return db('child')
  .returning(['id', 'fstname', 'lstname', 'username', 'parent_id'])
  .insert(user);
}

//find child by id
function findById(id) {
  return db('child')
    .where({ id })
    .first();
}
// get child chores
function getChoreById(id) {
  return db('chore as c')
    .where('c.child_id', id)
}
// return chores by child id
function getChild(id) {
  return db('chore as chr')
    .join('child as chd', 'chd.id', 'chr.child_id')
    .select('chd.name as child_name', 'chr.id as chore_id', 'chr.description', 
    'chr.comments', 'chr.Completed','chr.due_date', 'chr.chore_score', 'chr.bonus_pts', 
    'chr.clean_strk', 'chr.photo_obj', 'child_id', 'parent_id')
    .where('chr.child_id', id)
    .orderBy('chr.id');
}

// edit a child
function update(changes, id) {
  return db('child')
    .where('id', Number(id))
    .update(changes);
}
// delete a child
function remove(id) {
  return db("child")
    .where({ id })
    .del();
}