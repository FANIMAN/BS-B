exports.up = function(knex) {
    return knex.schema.alterTable('orders', function(table) {
      table.dropForeign(['customer_id']); // Drop existing foreign key constraint
      table.foreign('customer_id').references('users.id'); // Add new foreign key constraint referencing users.id
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('orders', function(table) {
      table.dropForeign(['customer_id']);
      table.foreign('customer_id').references('customers.id');
    });
  };
  