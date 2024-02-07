/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('books', function(table) {
    table.increments('id').primary();
    table.string('title');
    table.string('writer');
    table.string('image');
    table.decimal('price', 10, 2); // Assuming price is a decimal number with precision 10 and scale 2
    table.specificType('tags', 'text[]'); // Storing tags as an array of strings
    table.timestamps(true, true);
  });
};
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('books');
};






// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = function(knex) {
//     return knex.schema.createTable('books', function(table) {
//       table.increments('id').primary();
//       table.string('title');
//       table.string('writer');
//       table.string('image');
//       table.decimal('price', 10, 2); // Assuming price is a decimal number with precision 10 and scale 2
//       table.jsonb('tags'); // Storing tags as a JSONB data type (array of strings)
//       table.timestamps(true, true);
//     });
//   };
  
//   /**
//    * @param { import("knex").Knex } knex
//    * @returns { Promise<void> }
//    */
//   exports.down = function(knex) {
//     return knex.schema.dropTable('books');
//   };
  
