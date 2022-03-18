const express = require('express')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes')

const PORT = process.env.PORT || 3002

const app = express()
app.use(bodyParser.json())

app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})