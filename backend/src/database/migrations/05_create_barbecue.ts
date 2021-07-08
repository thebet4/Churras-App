import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('barbecue', table => {
    table.increments('barbecue_id').primary()
    table.integer('created_by').notNullable().references('user_id').inTable('user')
    table.integer('people_who_eat_meat').notNullable()
    table.integer('people_who_dont_eat_meat').notNullable()
    table.integer('people_who_drink_alcohol').notNullable()
    table.integer('people_who_dont_drink_alcohol').notNullable()
    table.integer('meat_estimate').notNullable()
    table.integer('drink_estimate').notNullable()
    table.integer('alcohol_estimate').notNullable()
    table.integer('ingredient_estimate').notNullable()
    table.integer('price').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('barbecue')
}

