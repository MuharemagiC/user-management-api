const bcrypt = require('bcrypt')
const pool = require('../config/databaseConfig')

const createUser = async (email, password, firstName, lastName, username) => {
  const client = await pool.connect();
  const encryptedPassword = await bcrypt.hash(password, 10)
  const query = `
    INSERT INTO users (email, password, first_name, last_name, username)
    VALUES(${email}, ${encryptedPassword}, ${firstName}, ${lastName}, ${username});
  `
  const result = await client.query(query)
  const user = (result) ? result.rows[0] : null
  client.release()
  return user
}

const getUserList = async () => {
  const client = await pool.connect();
  const query = `SELECT * FROM users;`
  const result = await client.query(query)
  const results = (result) ? result.rows : null
  client.release()
  return results
}

module.exports = {
  createUser,
  getUserList
}