const express = require('express')

const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = process.env.PORT || 3002

app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})