
exports.up = function(knex) {
  return knex.schema.createTable('pedidos', function(table){
    table.string('id').primary();
    table.string('comunidade').notNullable();
    table.timestamp('data',{ precision: 6 }).defaultTo(knex.fn.now());
    table.string('item').notNullable();
    table.integer('quantidade_total').notNullable();
    table.integer('quantidade_doada').notNullable();
    table.boolean('completo').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedidos');
};
