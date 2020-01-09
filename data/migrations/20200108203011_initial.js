// 1. we turn the function into async function
//2.to create this table you will run in the bash npx knex migrate: make initial
//3. once that's created you then move to the migration folder and start creating tables 
exports.up = async function(knex) {
    // the await is apart of the async function
    // to create the table you need knex.schema.createTable('"tableName", (table) => {})
    await knex.schema.createTable('zoos', (table) => {
        table.increments('id')
        table.string('name').notNullable()
        table.string('address').notNullable()
    }),

    await knex.schema.createTable('species', (table) => {
        table.increments('id')
        table.string('name').notNullable()        
    }),

    await knex.schema.createTable('animals', (table) => {
        table.increments('id')
        table.string('name').notNullable()
        table.integer('species_id')
           .notNullable()
            .references('id')
            .inTable('species')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    }),  

    await knex.schema.createTable('zoos_animals', (table) => {
        table.integer('zoo_id')
            .notNullable()
            .references('id')
            .inTable('zoos') 
            .onDelete('CASCADE')
            .onUpdate('CASCADE')  
        table.integer('animal_id')
                .notNullable()
                .references('id')
                .inTable('animals')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            //this dates of when the snimal was at the zoo
            table.date('from')
            table.date('to')
            //this creates a primary key as a combination of colums
            table.primary(['zoo_id', 'animal_id'])
    })


};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('zoos_animals')
    await knex.schema.dropTableIfExists('animals')
    await knex.schema.dropTableIfExists('species')
    await knex.schema.dropTableIfExists('zoos')
};
