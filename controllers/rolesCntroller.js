const rolesDB = require('../database/rolesDB')

const roles_delete = async (req, res) => {
  try {
    const { roleId } = req.params

    const role = await rolesDB.deleteRole(roleId)

    res.status(200).send(role)

  } catch (e) {
    res.status(400).send({message: 'Something went wrong'})
  }
}

const roles_create = async (req, res) => {
  try {
    const { userId } = req.params
    const { code, description } = req.body

    const role = await rolesDB.createRole(code, description, userId)

    res.status(200).send(role)

  } catch (e) {
    res.status(400).send({message: 'Something went wrong'})
  }
}

const roles_list = async (req, res) => {
  try {
    const { userId } = req.params

    const roles = await rolesDB.getRolesList(userId)

    res.status(200).send(roles)

  } catch (e) {
    res.status(400).send({message: 'Something went wrong'})
  }
}

module.exports = {
  roles_delete,
  roles_list,
  roles_create
}