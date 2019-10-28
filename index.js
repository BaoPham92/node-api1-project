// * PKGS
const express = require('express')
const server = express()
const port = 5000;

// * DATABASE
const db = require('./data/db')

// * MIDDLEWARE
server.use(express.json())

// * ROUTES

// ? GET '/' localhost:8000
server.get('/', (req, res) => {
    res.send('Welcome to the homepage')
})

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.json({ error: "Error requesting \'/api/users\' " }))
})

// ? LISTENER
server.listen(
    port,
    () => console.log(`Listening to port: ${port}`)
)