const db = require('../database/dbConfig');

module.exports = {
  insert,
  find,
  findBy,
  findById,
  get,
  remove, 
  update,
  getParent,
  getChildById,
  getChild
};

// get parent by id 

async function get(id) {
  return await db('parent as p')
    .select("p.id", "p.fname", "p.lname", "p.email", "p.username")
    .where({ id })
    .first();
}

function find() {
  return db('parent').select('id', 'username');
}

function findBy(filter) {
  return db('parent').where(filter);
}

//add a parent

async function insert(user) {

  const [id] = await db('parent').insert(user); 
  return findById(id);
}

// find parent by id

function findById(id) {
  return db('parent')
    .where({ id })
    .first();
}

// edit parent

function update(changes, id) {
  return db('parent as p')
    .select('p.fname', 'p.lname', 'p.email')
    .where('id', Number(id))
    .update(changes);
}

function remove(id) {
  return db("parent")
    .where({ id })
    .del();
}

function getChildById(id) {
  return db('child as c')
    .select('*')
    .where('c.id', id)
}

function getParent(id) {
  return db('child as c')
    .join('parent as p', 'p.id', 'c.parent_id')
    .select('p.name as parent_name', 'c.id as child_id', 'c.fstname', 
    'c.lstname', 'c.username' )
    .where('c.parent_id', id)
    .orderBy('c.id')
}

function getChild(id) {
  return db('child as c')
    .join('parent as p', 'p.id', 'c.parent_id')
    .select('p.fname', 'c.fstname', 'c.id', 'c.username')
    .where('p.id', id)
    .orderBy('c.id')
}