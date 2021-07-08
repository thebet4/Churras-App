import {Knex} from 'knex';

export async function seed (knex: Knex){
    await knex('category').insert([
      { name: 'BEBIDAS' },
      { name: 'CARNES'},
      { name: 'OUTROS'}
    ]);
}