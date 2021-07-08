import {Knex} from 'knex';

export async function seed (knex: Knex){
    await knex('user').insert([
        { name: 'admin', cpf: '000.000.000-00', email: 'admin@admin.com', password: 'admin', profile: 1},
        { name: 'user', cpf: '000.000.000-00', email: 'user@user.com', password: 'user', profile: 2}
    ]);
}