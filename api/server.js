import express from 'express'
import bodyParser from 'body-parser'

// import routeUser from './routes/user'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({ msg: process.env.WEB_API_URL })
})

// app.use('/orders', routeOrder)

module.exports = {
  path: '/api',
  handler: app,
}
