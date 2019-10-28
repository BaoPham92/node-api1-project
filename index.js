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

// ? GET '/api/users'
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.json({ errorMessage: "Error requesting \'/api/users\' " }))
})

// ? GET '/api/users/:id'
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => !!user === true &&
            res.status(200).json(user)
        )
        .catch(err => res.status(404)
            .json({ errorMessage: "The user with the specified ID does not exist." })
        )
})

// ? POST 'api/users/'
server.post('/api/users', (req, res) => {
    const user = req.body

    if (!!user.name === false || !!user.bio === false) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db.insert(user)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(500)
                .json({ errorMessage: "There was an error while saving the user to the database" })
            )
    }
})

// ? DELETE 'api/users/:id'
server.delete('/api/users/:id', (req, res) => {
    const user = req.params

    db.remove(user.id)
        .then(int => !(int < 0) ?
            res.status(200).json({ response: "user with id deleted" }) :
            res.status(404).json({ erroMessage: "The user with the specified ID does not exist." })
        )
        .catch(err => res.status(500)
            .json({ errorMessage: "The user could not be removed" })
        )
})

// ? UPDATE '/api/users/:id'
server.put('/api/users/:id', (req, res) => {
    const user = req.body

    if (!!user.name === false || !!user.bio === false) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db.update(req.params.id, user)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => res.status(500).json({ errorMessage: "The user information could not be modified" }))
    }
})

// ? LISTENER
server.listen(
    port,
    () => console.log(`Listening to port: ${port}`)
)