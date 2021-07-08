import {Knex} from 'knex';


export async function up(knex: Knex) {
  return knex.schema.createTable('user_address', table => {
    table.increments('address_id').primary()
    table.integer('user_id').notNullable().references('user_id').inTable('user')
    table.string('cep').notNullable()
    table.string('city').notNullable()
    table.string('city_name').notNullable()
    table.string('state').notNullable()
    table.string('state_name').notNullable()
    table.string('neighborhood').notNullable()
    table.string('street').notNullable()
    table.string('number').notNullable()
    table.string('complement').notNullable()

  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('user_address')
}

