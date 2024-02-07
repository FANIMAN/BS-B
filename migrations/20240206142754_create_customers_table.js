exports.up = function(knex) {
    return knex.schema.createTable('customers', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.integer('points').defaultTo(100);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('customers');
  };
  