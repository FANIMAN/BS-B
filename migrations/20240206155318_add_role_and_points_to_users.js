exports.up = function(knex) {
    return knex.schema.renameTable('customers', 'users')
      .then(() => {
        return knex.schema.alterTable('users', function(table) {
          table.string('role').notNullable().defaultTo('customer');
        });
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('users', function(table) {
      table.dropColumn('role');
    })
    .then(() => {
      return knex.schema.renameTable('users', 'customers');
    });
  };
  


  