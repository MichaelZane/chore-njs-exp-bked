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



      //child table
      .createTable("child", tbl => {
        tbl.increments();

        tbl.string("fstname").notNullable();

        tbl.string("lstname").notNullable();

        tbl
          .string("username", 128)
          .notNullable()
          .unique();

        tbl.string("password", 128).notNullable()

        tbl
        .integer("parent_id")
        .unsigned()
        .references("id")
        .inTable("parent")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      })


      //chore table

      .createTable("chore", tbl => {
        tbl.increments();

        tbl.string("name", 128)
        .notNullable();

        tbl.string("description", 500)
        .notNullable();

        tbl.string("comments", 255);

        tbl.boolean("completed")
        .defaultTo(false);

        tbl.date("due_date");

        tbl.integer("chore_score")
        .notNullable();

        tbl.integer("bonus_pts");

        tbl.integer("clean_strk");

        tbl.string("photo_obj", 250);

        tbl
        .integer("child_id")
        .unsigned()
        .references("id")
        .inTable("child")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      })
  );
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists("chore")
        .dropTableIfExists("child")
        .dropTableIfExists("parent")
   
};
