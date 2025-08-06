const pool = require('./pool');

exports.createUser = async (firstName, lastName, email, password) => {
  const queries = `
  INSERT INTO users (
    first_name, 
    last_name, 
    email, 
    password, 
    membership
  ) 
  VALUES ($1, $2, $3, $4, $5)
  `;
  const values = [firstName, lastName, email, password, false];
  const { rows } = await pool.query(queries, values);
  return rows;
};

exports.readUserByEmail = async (email) => {
  const queries = `
  SELECT
    *
  FROM
    users
  WHERE 
    email = $1;
  `;
  const values = [email];
  const { rows } = await pool.query(queries, values);
  return rows;
};

exports.readUserById = async (id) => {
  const queries = `
  SELECT 
    id,
    first_name || ' ' || last_name AS full_name,
    membership  
  FROM
    users
  WHERE 
    id = $1;
  `;
  const values = [id];
  const { rows } = await pool.query(queries, values);
  return rows;
};
