const userDB = require('../database/userDB')

const user_create = async (req, res) => {
    try {
        const { email, password, firstName, lastName, username } = req.body
        const user = await userDB.createUser(email, password, firstName, lastName, username)
        res.send(user)
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
}

const users_list = async (req, res) => {
  try {
    const users = await userDB.getUserList()
    res.send(users)
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

module.exports = {
    user_create,
    users_list
}