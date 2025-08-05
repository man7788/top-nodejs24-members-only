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
