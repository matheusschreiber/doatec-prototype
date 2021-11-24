
exports.up = function(knex) {
  return knex.schema.createTable('doadores', function(table){
    table.increments().primary();
    table.string('nome').notNullable();
    table.string('id_pedido').notNullable();
    table.integer('qtd_doada').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('doadores');
};
