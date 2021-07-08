import {Knex} from 'knex';


export async function up(knex: Knex) {
  return knex.schema.createTable('product', table => {
    table.increments('product_id').primary()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.string('photo')
    // table.string('category').notNullable()
    table.integer('category').notNullable().references('category_id').inTable('category')
    table.boolean('available').notNullable()
    table.integer('price').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('product')
}