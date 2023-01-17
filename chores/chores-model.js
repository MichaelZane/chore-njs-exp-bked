const db = require("../database/dbConfig")


module.exports = {
get,
getAll,
insert,
getChore,
findById,
update,
remove,
getChildrenChores
}

function getAll() {
  return db("chore").select("*")
}

async function getChildrenChores(parent_id) {
  const rows = await db("child")
    .join("chore", "child.id", "chore.child_id")
    .select("child.*", "chore.*")
    .where("child.parent_id", parent_id);
  const children = rows.reduce((acc, row) => {
    const child = acc.find((c) => c.id === row.child_id);
    if (!child) {
      acc.push({ id: row.child_id, fstname: row.fstname, lstname: row.lstname, username: row.username, parent_id: row.parent_id, chores: [{ name: row.name, id: row.id }] });
    } else {
      child.chores.push({ name: row.name, id: row.id, description: row.description, comments: row.comments, chore_score: row.chore_score, child_id: row.child_id });
    }
    return acc;
  }, []);
  return children;
}


function get(id) {
  return db('chore as c')
    .select("c.id", "c.child_id","c.name", "c.description", "c.comments", "c.completed", "c.due_date", "c.chore_score", "c.bonus_pts", "c.clean_strk", "imageUrl")
    .where({ id })
    .first();
}
//adding a chore 
function insert(chores) {
  return db('chore')
    .returning(['id', 'child_id', 'name', 'description', 'comments', 'completed', 'due_date', 'chore_score', 'bonus_pts', 'clean_strk', 'imageUrl'])
    .insert(chores);
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
    .select('c.name as chore_name', 'c.id as chore_id', 'c.description', 'c.comments', 'c.completed','c.due_date', 'c.chore_score', 'c.bonus_pts', 'c.clean_strk', 'c.imageUrl',)
    .where('c.chore_id', id)
    .orderBy('c.id');
}
