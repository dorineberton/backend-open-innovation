# backend-open-innovation

# run app
npx nodemon index.js

# create table
npx knex migrate:make create_users_table

## then, add table infos into the migrations file

# update table
npx knex migrate:latest