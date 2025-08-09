#! /usr/bin/env node

require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 255 ),
  last_name VARCHAR ( 255 ),
  email VARCHAR ( 255 ),
  password VARCHAR ( 255 ),
  membership BOOLEAN,
  admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users(id),
  message TEXT CONSTRAINT msglength CHECK (char_length(message) <= 1024),
  created TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS secrets (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  secret_code VARCHAR ( 255 )
);
`;

const membershipSecret = `
INSERT INTO secrets (secret_code) 
VALUES ($1);
`;

const values = [process.env.MEMBERSHIP_SECRET];
const url = process.argv[2] || process.env.PGCONNECTSTRING;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: url,
  });
  await client.connect();
  await client.query(SQL);
  await client.query(membershipSecret, values);
  await client.end();
  console.log('done');
}

main();
