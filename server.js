const express = require('express')

const authRoutes = require('./routes/authRoutes')

const app = express()
const port = process.env.PORT || 3002

app.use('/auth', authRoutes)

app.listen(port, () => {
    console.log('app listening on port 3000')
})