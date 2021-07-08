import {Knex} from 'knex';


export async function up(knex: Knex) {
  return knex.schema.createTable('category', table => {
    table.increments('category_id').primary()
    table.integer('name')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('category')
}

