const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('child').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('child').insert([
        {id: 1,
          fstname: 'Josh',
          lstname: 'Dimmick',
          username: 'joshd',
          password: bcrypt.hashSync("test1", 12),
          parent_id: 1

          },
        {id: 2, 
          fstname: 'Jules jr',
          lstname: 'Winnfield',
          username: 'myboy',
          password: bcrypt.hashSync("test2", 12),
          parent_id: 2

        },
        {id: 3, 
          fstname: 'Vinny',
          lstname: 'Vega',
          username: 'vinnyv',
          password: bcrypt.hashSync("test3", 12),
          parent_id: 3

        },
        {id: 4, 
          fstname: 'test5',
          lstname: 'test6',
          username: 'test7',
          password: bcrypt.hashSync("test8", 12),
          parent_id: 4

        }       
      ]);
    });
};



