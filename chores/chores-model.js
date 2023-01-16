const db = require("../database/dbConfig")


module.exports = {
get,
getAll,
insert,
getChore,
findById,
update,
remove,
getByChildId
}

function getAll() {
  return db("chore").select("*")
}
async function getByChildId(child_id) {
  const rows = await db("child")
    .join("chore", "child.id", "chore.child_id")
    .select("child.*", "chore.name")
    .where("child.id", child_id);
  const child = rows.length > 0 ? rows[0] : null;
  const chores = rows.map((row) => ({ name: row.name, description: row.description, completed: row.completed }));
  return { child, chores };
}

// async function getAllChildrenWithChores(id) {
//   const rows = await db("child")
//     .join("chore", "child.id", "chore.child_id")
//     .select("child.*", "chore.*");

//   const children = rows.reduce((acc, row) => {
//     const child = acc.find((c) => c.id === row.id);
//     if (child) {
//       child.chores.push({ name: row.name, description: row.description, completed: row.completed });
//     } else {
//       acc.push({
//         ...row,
//         chores: [{ name: row.name, description: row.description, completed: row.completed }],
//       });
//     }
//     return acc;
//   }, []);
//   return children;
// }

// async function getAllChildrenWithChores(child_id) {
//   const rows = await db("child")
//     .join("chore", "child.id", "chore.child_id")
//     .select("child.*", "chore.name")
//     .where("child.id", child_id);

//   const child = rows.length > 0 ? rows[0] : null;
//   const choreProperties = ["name", "description", "completed"];
//   const chores = rows.map((row) => 
//       choreProperties.reduce((acc, prop) => {
//           acc[prop] = row[prop];
//           return acc;
//       }, {})
//   );
//   return { child, chores };
// } 


// async function getByChildId(child_id) {
//   const results = await db("child")
//     .join("chore", "child.id", "chore.child_id")
//     .where("child.id", child_id)
//     .select("child.*", "chore.*");
//   const child = results[0];
//   const chores = results.map((result) => result.chore);
//   return { child, chores };
// }


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
