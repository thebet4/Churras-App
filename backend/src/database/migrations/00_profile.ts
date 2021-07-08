import {Knex} from 'knex';


export async function up(knex: Knex) {
  return knex.schema.createTable('profile', table => {
    table.increments('profile_id').primary()
    table.integer('name')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('profile')
}

