const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes')
const rolesRoutes = require('./routes/rolesRoutes')

const PORT = process.env.PORT || 3002

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/user', userRoutes)
app.use('/roles', rolesRoutes)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})