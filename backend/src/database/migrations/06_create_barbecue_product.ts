import {Knex} from 'knex';


export async function up(knex: Knex) {
  return knex.schema.createTable('barbecue_product', table => {
    table.increments('barbecue_product_id').primary()
    table.integer('barbecue_id').notNullable().references('barbecue_id').inTable('barbecue')
    table.integer('product_id').notNullable().references('product_id').inTable('product')
    table.integer('quantity').notNullable()

  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('barbecue_product')
}

