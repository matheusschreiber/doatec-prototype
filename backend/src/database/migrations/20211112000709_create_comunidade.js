
exports.up = function(knex) {
  return knex.schema.createTable('comunidades', function(table){
    table.string('id').notNullable().primary();
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('cidade').notNullable();
    table.string('uf', 2).notNullable();
    table.string('foto').notNullable();
    table.string('senha').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schrema.dropTable('comunidades');
};
