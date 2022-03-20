const bcrypt = require('bcrypt')
const _ = require('lodash')
const pool = require('../config/databaseConfig')

const createUser = async (email, password, firstName, lastName, username, status) => {
  const client = await pool.connect();
  const encryptedPassword = await bcrypt.hash(password, 10)
  const query = `
    INSERT INTO users (email, password, first_name, last_name, username, status)
    VALUES('${email}', '${encryptedPassword}', '${firstName}', '${lastName}', '${username}', '${status}');
  `
  const result = await client.query(query)
  const user = (result) ? result.rows[0] : null
  client.release()
  return user
}

const getUserList = async (page, orderBy, filterEmail) => {
  const order = _.isEmpty(orderBy) ? '' : `ORDER BY "${orderBy}" ASC`
  const filter = _.isEmpty(filterEmail) ? '' : `WHERE email = '${filterEmail}'`
  console.log(order)
  const limit = 10
  const offset = (page - 1) * limit
  const client = await pool.connect();
  const query = `SELECT * FROM users ${filter} ${order} LIMIT '${limit}' OFFSET '${offset}';`
  const result = await client.query(query)
  const results = (result) ? result.rows : null
  const countQuery = `SELECT COUNT(*) as count FROM users ${filter};`
  const countResult = await client.query(countQuery)
  const { count } = (countResult) ? countResult.rows[0] : null
  client.release()
  return { count, results }
}

const deleteUserById = async (userId) => {
  const client = await pool.connect();
  const query = `DELETE FROM users WHERE id = '${userId}';`
  const result = await client.query(query)
  const deletedUser = (result) ? result.rows[0]: null
  client.release()
  return deletedUser
}

const updateUserById = async (email, firstName, lastName, username, userId, status) => {
  const client = await pool.connect();
  const isFirstName = !_.isEmpty(firstName) ? `'${firstName}'` : '"users"."first_name"'
  const isLastName = !_.isEmpty(lastName) ? `'${lastName}'` : '"users"."last_name"'
  const isEmail = !_.isEmpty(email) ? `'${email}'` : '"users"."email"'
  const isUsername = !_.isEmpty(username) ? `'${username}'` : '"users"."username"'
  const isStatus = !_.isEmpty(status) ? `'${status}'` : '"users"."status"'

  const query = `
    UPDATE users SET email = ${isEmail}, first_name = ${isFirstName}, 
    last_name = ${isLastName}, username = ${isUsername}, status = ${isStatus} WHERE id = '${userId}';`
  const result = await client.query(query)
  const updatedUser = (result) ? result.rows[0]: null
  client.release()
  return updatedUser
}

const getUserByEmail = async (email) => {
  const client = await pool.connect();
  const query = `SELECT * FROM users WHERE email = '${email}';`
  const result = await client.query(query)
  const user = (result) ? result.rows[0] : null
  client.release()
  return user
}

const getUserByUsername = async (username) => {
  const client = await pool.connect();
  const query = `SELECT * FROM users WHERE username = '${username}';`
  const result = await client.query(query)
  const user = (result) ? result.rows[0] : null
  client.release()
  return user
}

const getUserById = async (id) => {
  const client = await pool.connect();
  const query = `SELECT "first_name", "last_name", "status", "email", "username" FROM users WHERE id = '${id}';`
  const result = await client.query(query)
  const user = (result) ? result.rows[0] : null
  client.release()
  return user
}

module.exports = {
  createUser,
  getUserList,
  deleteUserById,
  updateUserById,
  getUserByEmail,
  getUserByUsername,
  getUserById
}