import {Knex} from 'knex';

export async function seed (knex: Knex){
    await knex('profile').insert([
      { name: 'ADMIN' },
      { name: 'USER'}
    ]);
}