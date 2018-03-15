import mysql from 'mysql';

const  knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'root',
      database : 'Jukebox',
    }
  });

export default knex;