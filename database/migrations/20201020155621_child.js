
exports.up = function(knex) {
    return (
    	knex.schema
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
					.references("parent.parent_id")
					.inTable("parent")
					.onDelete("RESTRICT")
					.onUpdate("CASCADE");

			})
    )
};

exports.down = function(knex) {
	return knex.schema
        .dropTableIfExists("child")
  
};
