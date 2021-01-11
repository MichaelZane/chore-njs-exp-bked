
exports.up = function(knex) {
    return (
        knex.schema
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

            tbl.string("photo_obj", 12000);

            tbl
            .integer("child_id")
            .unsigned()
            .references("id")
            .inTable("child")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        })
    )  
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("chore")
  
};
