import {Knex} from 'knex';

export async function up (knex: Knex) {
  return knex.schema.createTable('user', table => {
    table.increments('user_id').primary()
    table.integer('profile').notNullable().references('profile_id').inTable('profile')
    table.string('name').notNullable()
    table.string('cpf').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
      
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('user')
}