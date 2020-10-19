const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parent')
    .then(function () {
      // Inserts seed entries
      return knex('parent').insert([
        {id: 1,
          fname: 'Jimmie',
          lname: 'Dimmick',
          email: 'jimmyd@test.com',
          username: 'hideout',
          password: bcrypt.hashSync("gourmetcafe", 12)          
          },
        {id: 2,
          fname: 'Jules',
          lname: 'Winnfield',
          email: 'badmthr@test.com',
          username: 'jules',
          password: bcrypt.hashSync("badmofo", 12)
          },
        {id: 3,
          fname: 'Vincent',
          lname: 'Vega',
          email: 'uzi@test.com',
          username: 'gunman',
          password: bcrypt.hashSync("junkie", 12)
          },
          {id: 4,
            fname: 'test1',
            lname: 'test2',
            email: 'test3@test.com',
            username: 'test4',
            password: bcrypt.hashSync("test5", 12)
            }
      
      ]);
    });
};
