exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table) {
      table.increments('id').primary();
      table.integer('customer_id').unsigned().references('customers.id');
      table.integer('book_id').unsigned().references('books.id');
      table.string('status').notNullable().defaultTo('pending');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('orders');
  };
  