import {Knex} from 'knex';

export async function seed (knex: Knex){
    await knex('user_address').insert([
        {
            user_id: 2,
            cep: '15910-000',
            city: '3531308',
            city_name: 'Monte Alto',
            state: '25',
            state_name: 'SP',
            neighborhood: 'Vera Cruz',
            street: 'Anezio panichelli',
            number: '521',
            complement: 'casa',
        },
    ]);
}