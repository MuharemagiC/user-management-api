const pool = require('../config/databaseConfig')

const createRole = async (code, description, userId) => {
  const client = await pool.connect();
  const query = `
    INSERT INTO roles (code, description, user_id)
    VALUES('${code}', '${description}', '${userId}');
  `
  const result = await client.query(query)
  const role = (result) ? result.rows[0] : null
  client.release()
  return role
}

const deleteRole = async (roleId) => {
  const client = await pool.connect();
  const query = `DELETE FROM roles WHERE id = '${roleId}';`
  const result = await client.query(query)
  const role = (result) ? result.rows[0] : null
  client.release()
  return role
}

const getRolesList = async (userId) => {
  const client = await pool.connect();
  const query = `SELECT "id", "code", "description" FROM roles WHERE user_id = '${userId}';`
  const result = await client.query(query)
  const roles = (result) ? result.rows : null
  client.release()
  return roles
}

module.exports = {
  createRole,
  deleteRole,
  getRolesList
}