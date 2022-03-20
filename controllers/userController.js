const userDB = require('../database/userDB')
const _ = require('lodash')

const user_create = async (req, res) => {
  try {
    const { email, password, firstName, lastName, username } = req.body
      if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(firstName) || _.isEmpty(lastName) || _.isEmpty(username)) {
        res.status(400).send({ message: 'All fields are required' })
        return
      }

      const isUserWithSameEmail = await userDB.getUserByEmail(email)

      if (!(_.isEmpty(isUserWithSameEmail))) {
        res.status(400).send({ message: 'User with this email already exist. Try again' })
        return
      }
      const isUserWithSameUsername = await userDB.getUserByUsername(username)

      if (!(_.isEmpty(isUserWithSameUsername))) {
        res.status(400).send({ message: 'User with this username already exist. Try again' })
        return
      }

      const user = await userDB.createUser(email, password, firstName, lastName, username)
      res.status(201).send(user)
  } catch (err) {
      res.status(400).send({ message: err.message });
    }
}

const users_list = async (req, res) => {
  try {
    const { page, orderBy, filterEmail } = req.query

    const users = await userDB.getUserList(page, orderBy, filterEmail)
    res.send(users)
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

const user_delete = async (req, res) => {
  try {
    const { id } = req.params

    if (_.isEmpty(id)) {
      res.status(400).send({ message: 'User id is empty. Please provide valid id.' })
    }

    const users = await userDB.deleteUserById(id)
    res.status(200).send(users)
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

const user_update = async (req, res) => {
  try {
    const { id } = req.params

    if (_.isEmpty(id)) {
      res.status(400).send({ message: 'User id is empty. Please provide valid id.' })
    }

    const { email, firstName, lastName, username, status } = req.body
    const users = await userDB.updateUserById(email, firstName, lastName, username, id, status)
    res.send(users)
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

const user_get_by_id = async (req, res) => {
  try {
    const { id } = req.params

    if (_.isEmpty(id)) {
      res.status(400).send({ message: 'User id is empty. Please provide valid id.' })
    }

    const user = await userDB.getUserById(id)
    res.status(200).send(user)
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

module.exports = {
    user_create,
    users_list,
    user_delete,
    user_update,
    user_get_by_id
}