// * PKGS
const express = require('express')
const server = express()
const port = 5000;

// * DATABASE
const db = require('./data/db')

// * MIDDLEWARE
server.use(express.json())

// * ROUTES

// ? LISTENER
server.listen(
    port,
    () => console.log(`Listening to port: ${port}`)
)