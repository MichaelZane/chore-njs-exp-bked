exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chore')
    .then(function () {
      // Inserts seed entries
      return knex('chore').insert([
        {id: 1,
          name: 'wash dishes',
          description: 'clean all dishes in sink.',
          comments: null,
          Completed: false,
          due_date: null,
          chore_score: 5,
          bonus_pts: null,
          clean_strk: null,
          photo_obj: null,
          child_id: 1,

        
        },
        {id: 2, 
          name: 'wash clothes',
          description: 'wash all clothes in laundry room.',
          comments: null,
          Completed: false,
          due_date: null,
          chore_score: 5,
          bonus_pts: null,
          clean_strk: null,
          photo_obj: null,
          child_id: 2,

         
        },
        {id: 3, 
          name: 'clean room',
          description: 'pick up you room',
          comments: null,
          Completed: false,
          due_date: null,
          chore_score: 5,
          bonus_pts: null,
          clean_strk: null,
          photo_obj: null,
          child_id: 3,

         
        },
        {id: 4, 
          name: 'test chore',
          description: 'test,test,test',
          comments: null,
          Completed: false,
          due_date: null,
          chore_score: 5,
          bonus_pts: null,
          clean_strk: null,
          photo_obj: null,
          child_id: 4,

         
        }
      ]);
    });
};


