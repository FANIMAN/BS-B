// migrations/20240207043613_update_tags_in_json.js

exports.up = function(knex) {
    return knex.schema.alterTable('books', function(table) {
      // Add a new "tags_text_array" column with type text[]
      table.specificType('tags_text_array', 'text[]');
    })
    .then(() => {
      // Copy values from the "tags" column to the new "tags_text_array" column
      return knex.raw('UPDATE books SET tags_text_array = ARRAY(SELECT jsonb_array_elements_text(tags))');
    })
    .then(() => {
      // Drop the old "tags" column
      return knex.schema.alterTable('books', function(table) {
        table.dropColumn('tags');
      });
    })
    .then(() => {
      // Rename the new "tags_text_array" column to "tags"
      return knex.schema.alterTable('books', function(table) {
        table.renameColumn('tags_text_array', 'tags');
      });
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('books', function(table) {
      // Revert the changes made in the "up" function
      table.dropColumn('tags');
      table.specificType('tags', 'jsonb');
    });
  };
  