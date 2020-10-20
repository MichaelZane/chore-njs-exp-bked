exports.up = function(knex) {
  return (
    knex.schema
      //Parent table
      .createTable("parent", tbl => {
        tbl.increments();

        tbl.string("fname", 128).notNullable();

        tbl.string("lname", 128).notNullable();

        tbl
          .string("email", 128)
          .notNullable()
          .unique();

        tbl
          .string("username", 128)
          .notNullable()
          .unique();

        tbl.string("password", 128).notNullable();
      })
  );
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists("parent")
   
};
