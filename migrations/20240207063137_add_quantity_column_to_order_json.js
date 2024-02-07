exports.up = function(knex) {
    return knex.schema.table('orders', function(table) {
      table.integer('quantity').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('orders', function(table) {
      table.dropColumn('quantity');
    });
  };
  