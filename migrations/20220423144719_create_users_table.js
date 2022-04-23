exports.up = function(knex, Promise) {
    try {
    return knex.schema.createTable('user', function(table) {
    table.increments();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.boolean('has_access').defaultTo(1);
    table.string('role').notNullable();
    })
    } catch (err) {
    console.error('impossible de créer l\'utilisateur:', err);
    if (knex) {
    knex.destroy();
    }
    }
    
    };
    exports.down = function(knex) {
    };
    