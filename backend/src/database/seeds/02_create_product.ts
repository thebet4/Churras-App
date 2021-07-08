import {Knex} from 'knex';

export async function seed (knex: Knex){
    await knex('product').insert([
        { name: 'cerveja sckol', description: 'Cerveja lata 375ml', photo: '', category: 1, available: true, price: 259 },
        { name: 'Alcatra', description: 'Alcatra kg', photo: '', category: 2, available: true, price: 2900 },
        { name: 'Arroz', description: 'Arroz pacote 5kg', photo: '', category: 3, available: true, price: 2000}
        
        
    ]);
}