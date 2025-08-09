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

exports.readSecretCode = async () => {
  const queries = `
  SELECT * 
  FROM secrets
  `;
  const { rows } = await pool.query(queries);
  return rows;
};

exports.updateUserById = async (id) => {
  const queries = `
  UPDATE users
  SET membership = true
  WHERE id = $1;
  `;
  const values = [id];
  const { rows } = await pool.query(queries, values);
  return rows;
};

exports.createMessage = async (id, message) => {
  const queries = `
  INSERT INTO messages (
    user_id,
    message,
    created
  )
  VALUEs ($1, $2, $3);
  `;
  const date = new Date().toISOString();
  const values = [id, message, date];
  const { rows } = await pool.query(queries, values);
  return rows;
};

exports.readAllMessagesSimple = async () => {
  const queries = `
  SELECT
    id,
    message
  FROM messages
  ORDER BY created;
  `;
  const { rows } = await pool.query(queries);
  return rows;
};
