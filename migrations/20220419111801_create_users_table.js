exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', function(table) {
      table.increments();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.boolean('has_access').defaultTo(1);
      table.string('role').defaultTo('user');
    })
};

exports.down = function(knex) {
  
};
