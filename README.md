# backend-open-innovation

# run app
npx nodemon index.js

# create knex file if doesn't exists
npx knex init

# create table
npx knex migrate:make create_users_table

## then, add table infos into the migrations file

# update table
npx knex migrate:latest